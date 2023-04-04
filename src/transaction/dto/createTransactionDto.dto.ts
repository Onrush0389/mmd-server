import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateTransactionDto {
  @IsUrl()
  @IsNotEmpty()
  id           : String ;
  blockNumber   :number ;
  minerUsername :String;
  transactionTime :String ;
  transactionAmount :GLfloat;
  transactionStatus : String;
}