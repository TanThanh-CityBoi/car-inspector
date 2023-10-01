import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { getUniqueCode } from '@/utils/function';
import { Cars } from '@cars/entities/car.entity';

@Injectable()
export class SeedCarService {
  constructor(private readonly config: ConfigService) {}

  async createCars() {
    const cars = [
      {
        model: 'Cx8',
        name: 'Mazda CX-8 Premium AWD 2 cầu 2022',
        thumbnail:
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp',
        images: [
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp',
        ],
        sku: 'ASMDNM',
        km: 31000,
        space: 4,
        location: 'TP.HCM',
      },

      {
        model: 'Cx8',
        name: 'Mazda CX-8 Premium AWD 2 cầu 2022',
        thumbnail:
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp',
        images: [
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp',
        ],
        sku: 'ASMDNM',
        km: 31000,
        space: 4,
        location: 'TP.HCM',
      },

      {
        model: 'Cx8',
        name: 'Mazda CX-8 Premium AWD 2 cầu 2022',
        thumbnail:
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp',
        images: [
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp',
        ],
        sku: 'ASMDNM',
        km: 31000,
        space: 4,
        location: 'TP.HCM',
      },

      {
        model: 'Cx8',
        name: 'Mazda CX-8 Premium AWD 2 cầu 2022',
        thumbnail:
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp',
        images: [
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp',
        ],
        sku: 'ASMDNM',
        km: 31000,
        space: 4,
        location: 'TP.HCM',
      },
      {
        model: 'Cx8',
        name: 'Mazda CX-8 Premium AWD 2 cầu 2022',
        thumbnail:
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp',
        images: [
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp',
          'https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp',
        ],
        sku: 'ASMDNM',
        km: 31000,
        space: 4,
        location: 'TP.HCM',
      },
    ];

    //
    for (let i = 0; i < cars?.length; i++) {
      const sku = await getUniqueCode();
      await Cars.save({
        ...cars?.[i],
        sku,
      });
    }
  }

  createInspections() {
    //
  }
}
