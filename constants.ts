import { User, Conversation, Hotel } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'support',
    name: 'Customer Service',
    age: 24,
    distance: 0,
    bio: 'Official Customer Support.',
    images: ['https://ui-avatars.com/api/?name=CS&background=25D366&color=fff&size=200&font-size=0.5'],
    isVip: true,
    tags: ['Official']
  },
  {
    id: '1',
    name: 'Grace',
    age: 54,
    distance: 1,
    bio: 'I\'m an American girl who loves painting, poetry, and deep emotions. I believe every heart hides a story — maybe you and I can write the next chapter together.',
    images: [
      '/images/profiles/823722357d4e62c6/4f38a5baa3b34cbd.png',
      '/images/profiles/b88a54ba6fe69d15/1e7818c1d6bc4a14.png',
      '/images/profiles/2a20cebb23779a46/2233cbe44d6179db.png',
      '/images/profiles/0a66c0a46765b4b4/2871162665273ce3.png'
    ],
    isVip: false,
    tags: ['Beautiful', 'Elegant'],
    height: '165cm',
    bust: 'C65',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 999,
    residence: 'USA'
  },
  {
    id: '2',
    name: 'Bella',
    age: 50,
    distance: 2,
    bio: 'American girl here! Music is my daily therapy — I love singing, playing instruments, and dancing around the kitchen. Want to be my favorite tune?',
    images: [
      '/images/profiles/961eb8baf0acceee/35c6408ff3f1ae22.png',
      '/images/profiles/9637e0ae75510a09/3c6b9be297566213.png',
      '/images/profiles/6f95a4bfdaed435c/498c59f7d18f960d.png',
      '/images/profiles/3253c0ede093dcfd/305959b6d49d6570.png'
    ],
    isVip: false,
    tags: ['Exquisite', 'Mesmerizing'],
    height: '165cm',
    bust: 'C65',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 1017,
    residence: 'USA'
  },
  {
    id: '3',
    name: 'Rose',
    age: 41,
    distance: 3,
    bio: 'I\'m American, and I live for travel, growth, and deep emotional bonds. Let\'s skip the small talk and talk about life, dreams, and maybe love.',
    images: [
      '/images/profiles/af6420373b4a0a0e/a8e8bf8a5400b9c8.png',
      '/images/profiles/137c519c3ec047c9/2540c92bf2fbb5e2.png',
      '/images/profiles/5b06e2a50ab923b8/16d21fcbc3a48b77.png',
      '/images/profiles/945f9aa5c0f00744/1837a0748763e56a.png'
    ],
    isVip: false,
    tags: ['Dazzling', 'Sophisticated'],
    height: '165cm',
    bust: 'C65',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 1590,
    residence: 'USA'
  },
  {
    id: '4',
    name: 'Scarlett',
    age: 54,
    distance: 4,
    bio: 'From the United States. I enjoy flowers, pretty dresses, and holding hands. I\'m the type who still believes in handwritten letters and real dates.',
    images: [
      '/images/profiles/ce737f3da2df5334/bbe0dc8d93eb2056.png',
      '/images/profiles/f6821e683f653dec/d75701be24b717d2.png',
      '/images/profiles/d108f499326745b1/c9111fb08de31ca2.png',
      '/images/profiles/a31a4d9b8fe3ec13/d632c220a57b4e53.png'
    ],
    isVip: false,
    tags: ['Angelic', 'Breathtaking'],
    height: '165cm',
    bust: 'C65',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 2680,
    residence: 'USA'
  },
  {
    id: '5',
    name: 'Anna',
    age: 54,
    distance: 5,
    bio: 'I\'m not perfect, but I\'m real. I don\'t need a perfect man, just one who\'s true to his heart.',
    images: [
      '/images/profiles/e2695d27c548e927/05d7c5536622ae8c.png',
      '/images/profiles/7088b4baaadb1ce0/2ead51da186e732a.png',
      '/images/profiles/d1def2132fa2247c/dbd43028b20388a1.png',
      '/images/profiles/cfcf3f25a77e26e0/fc5fb4b8826411f5.png'
    ],
    isVip: false,
    tags: ['Enchanting', 'Captivating'],
    height: '165cm',
    bust: 'C65',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 3321,
    residence: 'USA'
  },
  {
    id: '6',
    name: 'Chloe',
    age: 46,
    distance: 6,
    bio: 'Looking for someone who wants deep conversations, silly laughs, and something that lasts.',
    images: [
      '/images/profiles/4b38d3962ab39f93/fff7fc383e05c3aa.png',
      '/images/profiles/e354847a5e13d805/7fa36d820dd03799.png',
      '/images/profiles/44e93cbd569fab4e/96e11893c75deb34.png',
      '/images/profiles/c570d58b8476a828/0ea7e0846a5aa322.png'
    ],
    isVip: false,
    tags: ['Alluring', 'Delicate'],
    height: '165cm',
    bust: 'C65',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 1139,
    residence: 'USA'
  },
  {
    id: '7',
    name: 'Ava',
    age: 54,
    distance: 7,
    bio: 'A little shy at first, but once I open up — you\'ll see my heart is pure and full of love.',
    images: [
      '/images/profiles/feb8b3e52f642ae1/0fec4563946328aa.jpg',
      '/images/profiles/b6d444344e4b28ba/45a9776cbfb80534.png',
      '/images/profiles/5d61c7a3232f1295/f860b114bc4f9637.jpg',
      '/images/profiles/9a851b9361992553/19db62b2f25842cd.jpg'
    ],
    isVip: true,
    tags: ['Fitness and dancing'],
    height: '165cm',
    bust: '57',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 6719,
    residence: 'USA'
  },
  {
    id: '8',
    name: 'Olivia',
    age: 54,
    distance: 8,
    bio: 'I want something real, soft, steady — a slow burn kind of love. Not a firework that fades.',
    images: [
      '/images/profiles/3ff33009b242e6a0/14cabde587e64ab7.jpg',
      '/images/profiles/b97a603698a7b8a9/2e43c95eee1aee0c.jpg',
      '/images/profiles/1ac56a7f4361e97c/234c95d1dd11a4ae.jpg',
      '/images/profiles/941f8d3b6dfcfb43/57a8fbb2695bc284.jpg'
    ],
    isVip: false,
    tags: ['Photography'],
    height: '165cm',
    bust: '57',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 2567,
    residence: 'USA'
  },
  {
    id: '9',
    name: 'Sophie',
    age: 49,
    distance: 9,
    bio: 'I laugh loud, love deep, and never fake feelings. What you see is what you get.',
    images: [
      '/images/profiles/f02b2ea58931b2ac/85c043388cb16d71.png',
      '/images/profiles/c8cf28264ca98a6d/0fed280173ecd62e.png',
      '/images/profiles/0bfec536b29f19bf/7f33adeb3e4f89e6.png',
      '/images/profiles/f0e33da6922f4677/2758603ec5dd2411.png'
    ],
    isVip: true,
    tags: ['Jewelry Making'],
    height: '165cm',
    bust: '56',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 7816,
    residence: 'USA'
  },
  {
    id: '10',
    name: 'Emily',
    age: 37,
    distance: 10,
    bio: 'I love simple things: morning coffee, long hugs, and someone who really listens.',
    images: [
      '/images/profiles/508bf09c2d4e93d4/06766dec4b29b0f7.png',
      '/images/profiles/95491a796b8bdfc6/60092180b45c8626.png',
      '/images/profiles/09f8da3caefa2cac/b83840a975b38311.png',
      '/images/profiles/ae28f8db3ffc06e5/14d0c6be99390385.png'
    ],
    isVip: false,
    tags: ['Singing costume design'],
    height: '165cm',
    bust: '57',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 3389,
    residence: 'USA'
  },
  {
    id: '11',
    name: 'Selina',
    age: 48,
    distance: 11,
    bio: 'Your love is the spark that lights up my life',
    images: [
      '/images/profiles/2f22de2a733a6ac9/e5c6ad03ea0ddf18.jpg',
      '/images/profiles/31f21fc3a0873617/2330388ede0030ad.jpg',
      '/images/profiles/df6840ec194f8bda/fa51d5d732f23c89.jpg',
      '/images/profiles/0b59df49441c4011/8160bb41e5874a25.jpg'
    ],
    isVip: false,
    tags: ['Yoga', 'Pilates'],
    height: '165cm',
    bust: '58',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 2691,
    residence: 'USA'
  },
  {
    id: '12',
    name: 'Bianca',
    age: 40,
    distance: 12,
    bio: 'With you, I\'ve found a love worth fighting for.',
    images: [
      '/images/profiles/75c106c4bf8feedf/bd516e2a91951a6d.jpg',
      '/images/profiles/a69c9c5e5e8388b0/9e3276fe8d46d1e1.jpg',
      '/images/profiles/d7f299c95cbfea17/33b9da2489fbd3ce.jpg',
      '/images/profiles/5092648529d9b7c2/ed7e043694a48e3c.jpg'
    ],
    isVip: true,
    tags: ['Running', 'Swimming'],
    height: '165cm',
    bust: '56',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 7719,
    residence: 'USA'
  },
  {
    id: '13',
    name: 'Serena',
    age: 42,
    distance: 13,
    bio: 'You are my every reason, every hope, and every dream',
    images: [
      '/images/profiles/3667faf8eb75c271/01a6dcf4518f56ae.jpg',
      '/images/profiles/722777bc902227b1/2580a68b76e6970a.jpg',
      '/images/profiles/026d0e769f8cbe27/1d998472674ef1b0.jpg',
      '/images/profiles/90e55b33f8db19ab/6fda7bae6c3ba124.jpg'
    ],
    isVip: true,
    tags: ['Dancing', 'Hiking'],
    height: '165cm',
    bust: '58',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 5612,
    residence: 'USA'
  },
  {
    id: '14',
    name: 'Sophia',
    age: 52,
    distance: 14,
    bio: 'Your smile is my favorite sunrise',
    images: [
      '/images/profiles/653fbfb81cd5367b/c75c7ded640682a5.jpg',
      '/images/profiles/f706bdb278471139/ea929ebfad7e7232.jpg',
      '/images/profiles/a7f2e8dcbdb06246/8d6e52e0e6a6c11f.jpg',
      '/images/profiles/91b5007d3fdaef54/2b4f0beae39e4f0b.jpg'
    ],
    isVip: false,
    tags: ['Cycling', 'Fitness Training'],
    height: '165cm',
    bust: '55',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 2267,
    residence: 'USA'
  },
  {
    id: '15',
    name: 'Liliana',
    age: 38,
    distance: 15,
    bio: 'In your eyes, I see my future.',
    images: [
      '/images/profiles/eb6648ff0edf8464/e31e4766b2bd1c43.jpg',
      '/images/profiles/8eaf8102412da04f/83f50352ef55b14a.jpg',
      '/images/profiles/cf75843bf69c2746/ae8efb5ff5aa977b.jpg',
      '/images/profiles/4122ed265ab94c82/4e5c399cb4a1d5f2.jpg'
    ],
    isVip: true,
    tags: ['Surfing', 'Rock Climbing'],
    height: '165cm',
    bust: '56',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 6615,
    residence: 'USA'
  },
  {
    id: '16',
    name: 'Mia',
    age: 53,
    distance: 16,
    bio: 'I want something real, soft, steady — a slow burn kind of love. Not a firework that fades.',
    images: [
      '/images/profiles/1472b2b817916ee4/68693001c267899d.png',
      '/images/profiles/0ef2a6e99806590d/54b9122e58fdb9af.png',
      '/images/profiles/734755435c3bbeda/01c0eb8f35d364a9.png',
      '/images/profiles/2597635490c0653b/88abf5c3250bebfe.png'
    ],
    isVip: false,
    tags: ['Singing'],
    height: '165cm',
    bust: '52',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 2271,
    residence: 'USA'
  },
  {
    id: '17',
    name: 'Hannah',
    age: 53,
    distance: 17,
    bio: 'My love language? Consistency, attention, and a little teasing.',
    images: [
      '/images/profiles/599b151792b0f86c/5ad11b88f395fb1f.png',
      '/images/profiles/61608288c5d4f514/34ecc2a53c95e6e2.png',
      '/images/profiles/dcbe74d0d5c5c8a1/bb5b1d4dc663e086.png',
      '/images/profiles/01bbe401ee8e7ae3/4365a916bfded2fc.png'
    ],
    isVip: true,
    tags: ['Shooting equestrianism'],
    height: '165cm',
    bust: '55',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 7712,
    residence: 'USA'
  },
  {
    id: '18',
    name: 'Camila',
    age: 47,
    distance: 18,
    bio: 'You are my heart\'s most beautiful song',
    images: [
      '/images/profiles/d643bf4f8eb0097f/39ba6649e35b1c64.jpg',
      '/images/profiles/edc4f2edbbba0236/a89c776a601d47cf.jpg',
      '/images/profiles/24ebcfa05358f49a/3ee81f467ce16d65.jpg',
      '/images/profiles/8c1b54722588c6cb/e1bb3021c23208b6.jpg'
    ],
    isVip: false,
    tags: ['Musical Theatre', 'DJing'],
    height: '165cm',
    bust: '58',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 2216,
    residence: 'USA'
  },
  {
    id: '19',
    name: 'Madison',
    age: 38,
    distance: 19,
    bio: 'I\'m not distant, just saving my heart for someone real.',
    images: [
      '/images/profiles/dd6aaf1fd91e56c3/978539c86858ea16.jpg',
      '/images/profiles/5ccd86fce8a61708/c5381adba0143f9f.jpg',
      '/images/profiles/dc8a7cb31eb85562/92755cd558cde77b.jpg',
      '/images/profiles/539a128d6d3ef85e/152d45315f6d743a.jpg'
    ],
    isVip: true,
    tags: ['Songwriting', 'Violin Playing'],
    height: '165cm',
    bust: '68',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 6691,
    residence: 'USA'
  },
  {
    id: '20',
    name: 'Isla',
    age: 46,
    distance: 20,
    bio: 'Im yours, always and in all ways',
    images: [
      '/images/profiles/27a187009578b26d/cc481b6b09c0fda2.jpg',
      '/images/profiles/33d3699edd198d69/cbea7647381cbc52.jpg',
      '/images/profiles/61646008f4e1d4a8/6990e6f4d311f3cb.jpg',
      '/images/profiles/a1c353b96b9916e3/ebaa374fbcaed105.jpg'
    ],
    isVip: false,
    tags: ['Learning New Instruments', 'Attending Concerts'],
    height: '165cm',
    bust: '57',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 3367,
    residence: 'USA'
  },
  {
    id: '21',
    name: 'Savannah',
    age: 39,
    distance: 21,
    bio: 'You are the missing piece of my heart\'s puzzle.',
    images: [
      '/images/profiles/f7197387ac352464/1622334b8ee7f9ad.jpg',
      '/images/profiles/df28098769c83995/a836744be2607202.jpg',
      '/images/profiles/667326a161d441e3/824394d1ce0cd22a.jpg',
      '/images/profiles/27ef6d7c5740df9b/d22606f168335498.jpg'
    ],
    isVip: false,
    tags: ['Reading Novels', 'Poetry Writing'],
    height: '165cm',
    bust: '55',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 3349,
    residence: 'USA'
  },
  {
    id: '22',
    name: 'Esmeralda',
    age: 39,
    distance: 22,
    bio: 'I choose you today, tomorrow, and every day after.',
    images: [
      '/images/profiles/5ce1adfa779547b8/9e16394f70f9aa71.jpg',
      '/images/profiles/c7c160f6e488933f/f1862f3e214d9d99.jpg',
      '/images/profiles/670e184f0ae83cf8/7a7819f3975a20cd.jpg',
      '/images/profiles/241389b58bf3e0bd/6a5eebbec7709bb1.jpg'
    ],
    isVip: true,
    tags: ['Language Learning', 'Blogging'],
    height: '165cm',
    bust: '57',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 5561,
    residence: 'USA'
  },
  {
    id: '23',
    name: 'Natalie',
    age: 46,
    distance: 23,
    bio: 'Interesting souls deserve slow, genuine connection.',
    images: [
      '/images/profiles/48a0699339c774b3/f48a6ee28bf1aeac.jpg',
      '/images/profiles/ef3d6a69315075ac/3640e61c0df96133.jpg',
      '/images/profiles/b268b96cc072b7b4/1489bb2040ca61c6.jpg',
      '/images/profiles/bd98bce250c3932f/8b85fffb37795518.jpg'
    ],
    isVip: false,
    tags: ['Journaling', 'Watching Documentaries'],
    height: '165cm',
    bust: '55',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 2578,
    residence: 'USA'
  },
  {
    id: '24',
    name: 'Adriana',
    age: 45,
    distance: 24,
    bio: 'With you, love feels like magic.',
    images: [
      '/images/profiles/ba5284804a048913/6873f9317a46ea2e.jpg',
      '/images/profiles/8f865156823a9f66/b1ea7dca30c3c917.jpg',
      '/images/profiles/5865eb49e3da0272/cecd7f30dc76af67.jpg',
      '/images/profiles/ce5d6261d99e6077/4c697c1e4d8f6a5f.jpg'
    ],
    isVip: true,
    tags: ['Philosophy Reading', 'Researching History'],
    height: '165cm',
    bust: '53',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 7791,
    residence: 'USA'
  },
  {
    id: '25',
    name: 'Kate',
    age: 39,
    distance: 25,
    bio: 'Love isn\'t fast food — I believe in slow, meaningful connection.',
    images: [
      '/images/profiles/7c79efc00b6f7686/780d4aae3c3f29cd.jpg',
      '/images/profiles/12743f1014494cd9/eabc80988f97658b.jpg',
      '/images/profiles/01f4d7837693fd94/23d0eaead99b9aea.jpg',
      '/images/profiles/e6a7f648b22bd23c/de564aeddef4de54.jpg'
    ],
    isVip: false,
    tags: ['Youâ€™re not just my love; youâ€™re my destiny.', 'Youâ€™re not just my love; youâ€™re my destiny.'],
    height: '165cm',
    bust: '55',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 3378,
    residence: 'USA'
  },
  {
    id: '26',
    name: 'Scarlett',
    age: 47,
    distance: 26,
    bio: 'Your love runs through my veins like wildfire—I\'m forever yours',
    images: [
      '/images/profiles/c59b2662cf2a45c1/76aec65dd6d7f6e1.jpg',
      '/images/profiles/f8e5cf815d8fc625/f1b66ffdfd9228e4.jpg',
      '/images/profiles/a6d0407f4ad12596/0148ae8e08d6d78e.jpg',
      '/images/profiles/d915337e2159dd32/c3fbfd2c0416230c.jpg'
    ],
    isVip: true,
    tags: ['Baking', 'Cooking'],
    height: '165cm',
    bust: '53',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 7710,
    residence: 'USA'
  },
  {
    id: '27',
    name: 'Vivienne',
    age: 42,
    distance: 27,
    bio: 'In your embrace, I\'ve discovered a world where love has no end.',
    images: [
      '/images/profiles/6654de97372b7572/9a64b9a58a87ec2d.jpg',
      '/images/profiles/9db4d23c3270d67a/4efdf33fc52319d4.jpg',
      '/images/profiles/3219587facc01603/1e7c5654998cfdd5.jpg',
      '/images/profiles/37c43d8d23be3a67/af3471836ba12a47.jpg'
    ],
    isVip: true,
    tags: ['Gardening', 'Traveling'],
    height: '165cm',
    bust: '54',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 5586,
    residence: 'USA'
  },
  {
    id: '28',
    name: 'Juliette',
    age: 55,
    distance: 28,
    bio: 'Every moment with you feels like a scene from my favorite love story',
    images: [
      '/images/profiles/0c25541c981e3c40/5df09483b24ec547.jpg',
      '/images/profiles/46132aa5649f4881/63f5195f66d6bba2.jpg',
      '/images/profiles/5c3b3491930dece1/450c9928d57892cb.jpg',
      '/images/profiles/165fd20d2a22539d/74b36650ebad7712.jpg'
    ],
    isVip: false,
    tags: ['Shopping', 'Wine Tasting'],
    height: '165cm',
    bust: '56',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 3392,
    residence: 'USA'
  },
  {
    id: '29',
    name: 'Vanessa',
    age: 44,
    distance: 29,
    bio: 'My idea of romance is simple: living life together.',
    images: [
      '/images/profiles/8c1cce3155032d90/b4fdd98c2b908df0.jpg',
      '/images/profiles/bfc4202d9aa4979a/7627778fa9ca5ad2.jpg',
      '/images/profiles/3103fceb3a8e88d2/2eb676ca62c6644c.jpg',
      '/images/profiles/ed597a6279863a75/f54b237eb6e0e92b.jpg'
    ],
    isVip: true,
    tags: ['Board Games', 'Watching Movies'],
    height: '165cm',
    bust: '57',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 7721,
    residence: 'USA'
  },
  {
    id: '30',
    name: 'nala',
    age: 35,
    distance: 30,
    bio: 'I love words, sincerity, and stories told through your eyes.',
    images: [
      '/images/profiles/09bb51ab77e2ad18/100671550292bfe2.jpg',
      '/images/profiles/da83b0cd16adc263/84500776fcf9ee4d.jpg',
      '/images/profiles/05c1a575fd30e514/1938d4f6ae9b081d.jpg',
      '/images/profiles/e52c2243375092e0/d97fb4f76d9baf0b.jpg'
    ],
    isVip: false,
    tags: ['Singing - Dancing'],
    height: '165cm',
    bust: '49',
    serviceCity: 'USA',
    airFreight: true,
    chargeRange: 5,
    likes: 1565,
    residence: 'USA'
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c_support',
    user: MOCK_USERS[0], // Customer Service
    lastMessage: {
      id: 'm_support',
      senderId: 'support',
      text: 'Welcome to FUNLOVES! Please update your contact info.',
      timestamp: 'Just now',
      unread: true
    }
  }
];

export const PARTNER_HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: 'Qbic Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'h2',
    name: 'Luxury Suite London',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'h3',
    name: 'Grand Central',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'h4',
    name: 'Urban Loft',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=600&auto=format&fit=crop'
  }
];
