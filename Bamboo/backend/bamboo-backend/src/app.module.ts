import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { RegisterModule } from './auth/register/register.module';


@Module({
  imports: [
    AuthModule,
    RegisterModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
        children: [
          {
            path: "register",
            module: RegisterModule
          }
        ]
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
