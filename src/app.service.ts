import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getbreeding(): string {
    return 'Hello World with breed!';
  }
}
