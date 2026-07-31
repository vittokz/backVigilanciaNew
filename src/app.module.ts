import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DespachosModule } from './modules/despachos/despachos.module';
import { ProcesosModule } from './modules/procesos/procesos.module';
import { ProcesoPersonasModule } from './modules/proceso-personas/proceso-personas.module';
import { ActuacionesModule } from './modules/actuaciones/actuaciones.module';
import { ArchivosModule } from './modules/archivos/archivos.module';
import { ComentariosModule } from './modules/comentarios/comentarios.module';
import { HonorariosModule } from './modules/honorarios/honorarios.module';
import { CobrosModule } from './modules/cobros/cobros.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';

import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
      }),
    }),
    DespachosModule,
    ProcesosModule,
    ProcesoPersonasModule,
    ActuacionesModule,
    ArchivosModule,
    ComentariosModule,
    HonorariosModule,
    CobrosModule,
    UsuariosModule,
  ],
})
export class AppModule {}
