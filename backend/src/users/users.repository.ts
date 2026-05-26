import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}
  

  create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
      include: { empresa: true },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { empresa: true },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { empresa: true },
    });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getCompanyRanking(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { empresaId: true },
    });

    if (!user || !user.empresaId) {
      const singleUser = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, points: true, lastPlayedAt: true },
      });
      return singleUser ? [{ ...singleUser, position: 1 }] : [];
    }

    const participants = await this.prisma.user.findMany({
      where: { empresaId: user.empresaId },
      orderBy: { points: 'desc' },
      select: {
        id: true,
        name: true,
        points: true,
        lastPlayedAt: true,
      },
    });

    return participants.map((p, i) => ({
      position: i + 1,
      id: p.id,
      name: p.name,
      points: p.points,
      lastPlayedAt: p.lastPlayedAt,
    }));
  }

  async createReservation(userId: string, data: any) {
    const pointsAwarded = 10;
    const reservation = await this.prisma.reservation.create({
      data: {
        reservationNumber: data.reservationNumber,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
        guestName: data.guestName,
        hotelName: data.hotelName,
        pointsAwarded,
        userId,
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        points: { increment: pointsAwarded },
        lastPlayedAt: new Date(),
      },
    });

    return reservation;
  }

  async recordSpin(userId: string, prizeName: string, points: number) {
    const spin = await this.prisma.spinHistory.create({
      data: {
        prizeName,
        points,
        userId,
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        points: { increment: points },
        lastPlayedAt: new Date(),
      },
    });

    return spin;
  }

  async getAllUsersForAdmin() {
    return this.prisma.user.findMany({
      include: {
        empresa: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAccessLogsForAdmin() {
    return this.prisma.accessLog.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCampaignStatsForAdmin() {
    const users = await this.prisma.user.findMany({
      include: {
        empresa: true,
        reservations: true,
        spinHistory: true,
      },
      orderBy: { points: 'desc' },
    });

    return users.map((user) => {
      const totalReservations = user.reservations.length;
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        empresaName: user.empresa?.name || 'Sem Empresa',
        points: user.points,
        spinsPlayed: user.spinHistory.length,
        prizesWon: user.spinHistory.map((s) => s.prizeName),
        correctMatches: Math.floor(user.points / 15),
        wrongMatches: Math.max(0, totalReservations - Math.floor(user.points / 15)),
        reservationsCount: totalReservations,
        lastPlayedAt: user.lastPlayedAt,
      };
    });
  }
}
