import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DepartmentsModule } from './departments/departments.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProd = configService.get('NODE_ENV') === 'production';
        const databaseUrl = configService.get<string>('DATABASE_URL');
        
        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [join(__dirname, '**', '*.entity.{ts,js}')],
            synchronize: !isProd,
            logging: !isProd,
            ssl: {
              rejectUnauthorized: false 
            },
            connectTimeoutMS: 10000, 
            extra: {
              family: 4
            }
          };
        }
        
        console.log(`Using local database configuration`);
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          synchronize: !isProd,
          logging: !isProd,
          extra: {
            family: 4
          }
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    UsersModule,
    DepartmentsModule,
  ],
})
export class AppModule {}