import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PostModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
