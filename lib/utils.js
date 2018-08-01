import moment from 'moment';

export const isValidDate = (dt) => {
    return moment(dt, process.env.DATE_FORMAT, true).isValid();
}