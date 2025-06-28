import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { CoreModule } from './core/core.module';

import { AdminPanelModule } from './global/admin_panel/admin_panel.module';
import { AuthModule } from './global/auth/auth.module';
import { CategoryModule } from './global/category/category.module';
import { ComentsModule } from './global/coments/coments.module';
import { FavoritesModule } from './global/favorites/favorites.module';
import { MoviesModule } from './global/movies/movies.module';
import { ProfileModule } from './global/profile/profile.module';
import { SubscriptioPlanModule } from './global/subscriptio_plan/subscriptio_plan.module';
import { SuperAdminModule } from './global/super-admin/super-admin.module';
import { WatchHistoryModule } from './global/watch-history/watch-history.module';

@Module({
  imports: [
    CoreModule,
    AdminPanelModule,
    AuthModule,
    CategoryModule,
    ComentsModule,
    FavoritesModule,
    MoviesModule,
    ProfileModule,
    SubscriptioPlanModule,
    SuperAdminModule,
    WatchHistoryModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'src', 'uploads'),
    }),
  ],
})
export class AppModule { }
