import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  findById(id: string) {
    return this.usersRepository.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }

  getCompanyRanking(userId: string) {
    return this.usersRepository.getCompanyRanking(userId);
  }

  createReservation(userId: string, data: any) {
    return this.usersRepository.createReservation(userId, data);
  }

  recordSpin(userId: string, prizeName: string, points: number) {
    return this.usersRepository.recordSpin(userId, prizeName, points);
  }

  getAllUsersForAdmin() {
    return this.usersRepository.getAllUsersForAdmin();
  }

  getAccessLogsForAdmin() {
    return this.usersRepository.getAccessLogsForAdmin();
  }

  getCampaignStatsForAdmin() {
    return this.usersRepository.getCampaignStatsForAdmin();
  }
}
