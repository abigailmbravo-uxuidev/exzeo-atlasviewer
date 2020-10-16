export const usersData = {
    user1 : { login: 'andreiShat',
    password: 'Vega1407!' },
    user2 : { login: 'atlasqa',
    password:  'Titan123' },
}

let d,m,h,s,date;

    date = new Date;
    d = date.getDate();
    m = date.getMonth();
    h = date.getHours();
    s = date.getSeconds();
    let feedNo1Name = 'feedNo1' + d + m + h + s
    let feedNo2Name = 'feedNo2' + d + m + h + s
    let feedNo3Name = 'feedNo3' + d + m + h + s

export const feeds = [feedNo3Name,feedNo1Name,feedNo2Name]