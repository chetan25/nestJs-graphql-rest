import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

/**
 * Core module to expose the shared
 * JWT Module across multiple modules
 */
@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'weewewwe',
      signOptions: { expiresIn: '600s' },
    }),
  ],
  exports: [JwtModule, PassportModule],
})
export class CoreModule {}
