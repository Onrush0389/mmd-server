import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
    
    // blockNumber: number;
    @IsUrl()
    @IsNotEmpty()
    minerUsername: string;
    mmdWalletAddress: string;
    privateKey: string;
  }