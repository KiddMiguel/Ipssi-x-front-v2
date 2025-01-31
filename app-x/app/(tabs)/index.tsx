import React from 'react';
import { View, FlatList } from 'react-native';
import PostCard from '../../components/PostCard/PostCard';
import PostForm from '../../components/PostForm/PostForm';
import { SafeAreaView } from 'react-native-safe-area-context';
import Global from '@/constants/Global';

const mockPosts = [
    {
        _id: '1',
        name: 'Alice Dupont',
        author: 'aliceD',
        content: 'Hello world! #ReactNative',
        createdAt: new Date().toISOString(),
        likes: ['user1', 'user2'],
    },
    {
        _id: '2',
        name: 'Jean Martin',
        author: 'jeanM',
        content: 'Une belle journée ☀️',
        createdAt: new Date().toISOString(),
        likes: ['user3'],
    },
    {
        _id: '3',
        name: 'Claire Fontaine',
        author: 'claireF',
        content: 'React Native et top ! 🚀',
        createdAt: new Date().toISOString(),
        likes: [],
    },
    {
        _id: '4',
        name: 'Paul Dupuis',
        author: 'paulD',
        content: 'Hello React Native !',
        createdAt: new Date().toISOString(),
        likes: [],
      },
{
  _id: '5',
  name: 'Marie Curie',
  author: 'marieC',
  content: 'Science is fascinating!',
  createdAt: new Date().toISOString(),
  likes: ['user4'],
},
{
  _id: '6',
  name: 'Albert Einstein',
  author: 'albertE',
  content: 'E=mc²',
  createdAt: new Date().toISOString(),
  likes: ['user5', 'user6'],
},
{
  _id: '7',
  name: 'Isaac Newton',
  author: 'isaacN',
  content: 'Gravity is amazing!',
  createdAt: new Date().toISOString(),
  likes: ['user7'],
},
{
  _id: '8',
  name: 'Nikola Tesla',
  author: 'nikolaT',
  content: 'Electricity is the future!',
  createdAt: new Date().toISOString(),
  likes: ['user8', 'user9'],
},
{
  _id: '9',
  name: 'Galileo Galilei',
  author: 'galileoG',
  content: 'The Earth is not the center of the universe.',
  createdAt: new Date().toISOString(),
  likes: ['user10'],
},
{
  _id: '10',
  name: 'Ada Lovelace',
  author: 'adaL',
  content: 'The first programmer!',
  createdAt: new Date().toISOString(),
  likes: ['user11', 'user12'],
},
{
  _id: '11',
  name: 'Charles Darwin',
  author: 'charlesD',
  content: 'Evolution is a fascinating process.',
  createdAt: new Date().toISOString(),
  likes: ['user13'],
},
{
  _id: '12',
  name: 'Stephen Hawking',
  author: 'stephenH',
  content: 'Black holes are mysterious.',
  createdAt: new Date().toISOString(),
  likes: ['user14', 'user15'],
},
{
  _id: '13',
  name: 'Rosalind Franklin',
  author: 'rosalindF',
  content: 'DNA is the blueprint of life.',
  createdAt: new Date().toISOString(),
  likes: ['user16'],
},
{
  _id: '14',
  name: 'Niels Bohr',
  author: 'nielsB',
  content: 'Quantum mechanics is intriguing.',
  createdAt: new Date().toISOString(),
  likes: ['user17', 'user18'],
},
{
  _id: '15',
  name: 'Richard Feynman',
  author: 'richardF',
  content: 'Physics is fun!',
  createdAt: new Date().toISOString(),
  likes: ['user19'],
},
{
  _id: '16',
  name: 'James Clerk Maxwell',
  author: 'jamesM',
  content: 'Electromagnetism is fundamental.',
  createdAt: new Date().toISOString(),
  likes: ['user20', 'user21'],
},
{
  _id: '17',
  name: 'Michael Faraday',
  author: 'michaelF',
  content: 'Electromagnetic induction is key.',
  createdAt: new Date().toISOString(),
  likes: ['user22'],
},
{
  _id: '18',
  name: 'Dmitri Mendeleev',
  author: 'dmitriM',
  content: 'The periodic table is essential.',
  createdAt: new Date().toISOString(),
  likes: ['user23', 'user24'],
},
{
  _id: '19',
  name: 'Gregor Mendel',
  author: 'gregorM',
  content: 'Genetics is the future of biology.',
  createdAt: new Date().toISOString(),
  likes: ['user25'],
},
{
  _id: '20',
  name: 'Louis Pasteur',
  author: 'louisP',
  content: 'Vaccines save lives.',
  createdAt: new Date().toISOString(),
  likes: ['user26', 'user27'],
},
{
  _id: '21',
  name: 'Alexander Fleming',
  author: 'alexanderF',
  content: 'Penicillin is a breakthrough.',
  createdAt: new Date().toISOString(),
  likes: ['user28'],
},
{
  _id: '22',
  name: 'Jane Goodall',
  author: 'janeG',
  content: 'Chimpanzees are fascinating.',
  createdAt: new Date().toISOString(),
  likes: ['user29', 'user30'],
},
{
  _id: '23',
  name: 'Carl Sagan',
  author: 'carlS',
  content: 'The cosmos is vast and beautiful.',
  createdAt: new Date().toISOString(),
  likes: ['user31'],
},
{
  _id: '24',
  name: 'Neil deGrasse Tyson',
  author: 'neilT',
  content: 'Astrophysics is mind-blowing.',
  createdAt: new Date().toISOString(),
  likes: ['user32', 'user33'],
}
];

export default function HomeScreen() {
    return (
          <SafeAreaView style ={Global.container}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <PostForm />
            <FlatList 
                data={mockPosts} 
                keyExtractor={(item) => item._id} 
                renderItem={({ item }) => <PostCard post={item} />} 
            />
        </View>
        </SafeAreaView>
    );
}
