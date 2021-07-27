import _ from 'lodash';
import crypto from 'crypto';

const User = (props) => {
    const parseProps = {
        username: _.get(props, 'username', null),
        lastname: _.get(props, 'lastname', null),
        name: _.get(props, 'name', null),
        email: _.get(props, 'email', null),
        birthday: _.get(props, 'birthday', null),
        password: _.get(props, 'password', null),
        secret: _.get(props, 'secret', crypto.randomBytes(10).toString('hex')),
        createdAt: _.get(props, 'createdAt', new Date().toISOString()),
        updatedAt: new Date().toISOString(),
        profile: {
            chats: '777',
            users: '777',
        }
    };

    if (parseProps.username && typeof parseProps.username !== 'string') {
        throw new Error('username should be string');
    }
    if (parseProps.lastname && typeof parseProps.lastname !== 'string'){
        throw new Error('lastname should be string');
    }
    if (parseProps.name && typeof parseProps.name !== 'string'){
        throw new Error('name should be string');
    }
    if (parseProps.email && typeof parseProps.email !== 'string'){
        throw new Error('email should be string');
    }
    if (parseProps.birthday && !parseProps.birthday instanceof Date){
        throw new Error('birthday should be date');
    }
    if (parseProps.password){
        parseProps.hashedPassword = crypto.createHmac('sha256', parseProps.secret)
            .update(parseProps.password)
            .digest('hex');
        delete parseProps.password;
    }

    return parseProps;
}

export default User;