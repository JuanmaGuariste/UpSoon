import multer from 'multer';
import crypto from 'crypto';

export const uploadFile = () => {
    let extencion;
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if (file.fieldname === 'identification') {
                extencion = ".pdf";
                cb(null, 'public/documents/identification');
            } else if (file.fieldname === 'address') {
                extencion = ".pdf";
                cb(null, 'public/documents/address');
            } else if (file.fieldname === 'account') {
                extencion = ".pdf";
                cb(null, 'public/documents/account');
            } else if (file.fieldname === 'profile') {
                extencion = ".jpg";
                cb(null, 'public/profiles');
            } else if (file.fieldname === 'products') {
                extencion = ".jpeg";
                cb(null, 'public/products');
            } else {
                cb(new Error('Campo de archivo no válido'), null);
            }
        },
        filename: function (req, file, cb) {
            const randomString = crypto.randomBytes(8).toString('hex');
            const filename = file.fieldname + "-" + randomString + extencion;
            cb(null, filename);
        },
    });
    return multer({ storage });
}