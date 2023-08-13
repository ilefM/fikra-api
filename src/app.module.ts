import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostService } from './post/post.service';
import { PostsModule } from './post/post.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PostsModule],
  controllers: [AppController],
  providers: [AppService, PostService],
})
export class AppModule {}
