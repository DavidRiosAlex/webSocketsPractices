import DB from './middlewares/db';
import userSchema from '../../models/user.model';

const database = new DB();

export default async function registerUser(req, res) {
  console.time('user register endpoint');
  const db = await database.connect();
  const userCollection = db.collection('users');

  const userToInsert = userSchema({
    username: 'admin2',
    lastname: 'deiv',
    name: 'deiv',
    email: 'deivid.rios.alex2@gmail.com',
    birthday: new Date(1997,9,10),
    password: 'Deiv1234',
    secret: process.env.SECRET_API_KEY,
  });

  const modelLength = await userCollection.estimatedDocumentCount();

  const { ops:[user] } = await userCollection.insertOne(userToInsert);

  if (!modelLength) await userCollection.createIndex({ username: 1, email: 1 }, { unique:true })

  console.timeEnd('user register endpoint');
  return res.status(200).json({user});
}
