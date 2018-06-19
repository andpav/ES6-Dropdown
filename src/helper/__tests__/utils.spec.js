import * as utils from './../utils';

describe('utils', () => {
  const array = [
    {
      id: '1',
      name: 'Vasily Slonikhin',
      photo: 'src/assets/pic1.jpg',
    },
    {
      id: '2',
      name: 'Ivan Molotov',
      photo: 'src/assets/pic2.jpg',
    },
    {
      id: '3',
      name: 'Boris the Blade',
      photo: 'src/assets/pic3.jpg',
    },
    {
      id: '4',
      name: 'Andrey Rogozov',
      photo: 'src/assets/pic4.jpg',
    },
    {
      id: '5',
      name: 'Андрей Рогозов',
      photo: 'src/assets/pic4.jpg',
    },
  ];

  it('findMatch smart filter en case', () => {
    const result = [
      {
        id: '4',
        name: 'Andrey Rogozov',
        photo: 'src/assets/pic4.jpg',
      },
      {
        id: '5',
        name: 'Андрей Рогозов',
        photo: 'src/assets/pic4.jpg',
      },
    ];

    expect(utils.findMatch(true, array, 'rogo')).toEqual(result);
    expect(utils.findMatch(true, array, 'hjuj')).toEqual(result);
  });

  it('findMatch smart filter ru case', () => {
    const result = [
      {
        id: '4',
        name: 'Andrey Rogozov',
        photo: 'src/assets/pic4.jpg',
      },
      {
        id: '5',
        name: 'Андрей Рогозов',
        photo: 'src/assets/pic4.jpg',
      },
    ];

    expect(utils.findMatch(true, array, 'рого')).toEqual(result);
    expect(utils.findMatch(true, array, 'кщпщ')).toEqual(result);
  });

  it('findMatch without smart filter en case', () => {
    const result = [
      {
        id: '4',
        name: 'Andrey Rogozov',
        photo: 'src/assets/pic4.jpg',
      },
    ];

    expect(utils.findMatch(false, array, 'Rogo')).toEqual(result);
    expect(utils.findMatch(false, array, 'рого')).toEqual([]);
  });

  it('findMatch without smart filter ru case', () => {
    const result = [
      {
        id: '5',
        name: 'Андрей Рогозов',
        photo: 'src/assets/pic4.jpg',
      },
    ];

    expect(utils.findMatch(false, array, 'Рого')).toEqual(result);
    expect(utils.findMatch(false, array, 'rogo')).toEqual([]);
  });
});
