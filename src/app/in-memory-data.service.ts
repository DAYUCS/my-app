import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const customers = [
      { id: 11, name: 'Mr. Nice', tolerance: 1 },
      { id: 12, name: 'Narco', tolerance: 2 },
      { id: 13, name: 'Bombasto', tolerance: 3 },
      { id: 14, name: 'Celeritas', tolerance: 4 },
      { id: 15, name: 'Magneta', tolerance: 5 },
      { id: 16, name: 'RubberMan', tolerance: 6 },
      { id: 17, name: 'Dynama', tolerance: 7 },
      { id: 18, name: 'Dr IQ', tolerance: 8 },
      { id: 19, name: 'Magma', tolerance: 9 },
      { id: 20, name: 'Tornado', tolerance: 0 }
    ];
    return { customers };
  }
}