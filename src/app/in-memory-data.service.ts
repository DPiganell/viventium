import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as faker from 'faker/locale/en_US';

export class InMemoryDataService implements InMemoryDbService {
  private singlePost() {
    return {
      id: faker.random.number(),
      title: faker.lorem.sentence(),
      text:
        '<p>' +
        faker.lorem.paragraph() +
        ' <a href="' +
        faker.internet.url() +
        '">Link Test</a> ' +
        faker.lorem.paragraph() +
        '</p>',
      tags: [
        {
          name: faker.random.arrayElement(['bug', 'issue', 'etc'])
        }
      ]
    };
  }

  createDb() {
    const comments = [];
    for (let i = 0; i < 50; i++) {
      comments.push(this.singlePost());
    }
    return { comments };
  }
}
