import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  private readonly logger = new Logger(MailController.name);

  constructor(private readonly mailService: MailService) {}

  @EventPattern('send_reset_email')
  async handleSendResetEmail(@Payload() data: { email: string; token: string }, @Ctx() context: RmqContext) {
    this.logger.log(`Received password reset event for ${data.email}`);
    
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    try {
      await this.mailService.sendPasswordResetEmail(data.email, data.token);
      
      // Manual acknowledgment since queueOptions: { durable: true } usually implies manualAck
      channel.ack(originalMsg);
    } catch (error) {
      this.logger.error('Error processing email event, requeuing...', error);
      // Nack and requeue the message
      channel.nack(originalMsg, false, true);
    }
  }
}
