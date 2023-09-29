import { HttpStatus } from '@nestjs/common';
import { IResponse } from '@/interfaces';

export const _response = ({
  status = HttpStatus.OK,
  data = null,
  message = 'success',
}): IResponse<any> => ({
  status,
  data,
  message,
});
