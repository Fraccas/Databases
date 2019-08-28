import { Query } from './index';

const getChirps = async () => Query('select c.id as ChirpID, u.name as UserName, c.text as ChirpText from chirps c join users u on c.userid = u.id');
const getChirpById = async (id: string) => Query('select c.id as ChirpID, u.name as UserName, c.text as ChirpText from chirps c join users u on c.userid = u.id WHERE c.id = ?', [id]);

const postChirp = async (userid: string, chirptext: string) => Query('insert into chirps (userid, text) values (?, ?)', [userid, chirptext]);
const updateChirp = async (id: string, chirptext: string) => Query('UPDATE chirps SET text = ? WHERE id = ?', [chirptext, id]);
const deleteChirp = async (id: string) => Query('DELETE FROM chirps WHERE id = ?', [id]);

const getIdByUsername = async (username: string) => Query('SELECT id FROM users WHERE name = ?', [username]);
const storeNewUser = async (username: string) => Query('insert into users (name, email, password) values (?, "testemail@yahoo.com", "testpass")', [username]);

export default {
    getChirps, getChirpById,
    postChirp, updateChirp, deleteChirp,
    getIdByUsername, storeNewUser
}