const sql = require('../config/db');

const User = function(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.is_verified = user.is_verified || false;
    this.verification_token = user.verification_token;
};


User.create = (newUser, result) => {
    sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log(res,'ress');
        
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findByEmail = (email, result) => {
    sql.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log(res,'resfindBy');

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};

User.findOne = ( value, result) => {
    sql.query(`SELECT * FROM users WHERE verification_token = ?`, [value], (err, res) => {

        // console.log(err,'errfindOne')
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: 'not_found' }, null);
    });
};


User.update = (id, updatedFields, result) => {
    sql.query('UPDATE users SET ? WHERE id = ?', [updatedFields, id], (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log(res.affectedRows,'res.affectedRows');
        
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        result(null, { id: id, ...updatedFields });
    });
};
module.exports = User;