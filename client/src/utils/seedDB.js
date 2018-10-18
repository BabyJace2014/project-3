import API from './API';

const users = [ {   email: "abhi@rusom.edu",
                    password: "12345678",
                    firstname: "Abhi",
                    lastname: "Pradhan"},
                {   email: "jeff@rusom.edu",
                    password: "12345678",
                    firstname: "Jeff",
                    lastname: "Lempicki"},
                {   email: "mike@rusom.edu",
                    password: "12345678",
                    firstname: "Michael",
                    lastname: "McAuliffe"},
                {   email: "dri@rusom.edu",
                    password: "asdf;lkj",
                    firstname: "Adriana",
                    lastname: "Doherty"}
                ];

const club = {  clubname: "RU Somerset Readers",
                admin: "dri@rusom.edu",
                members: [{ email: "dri@rusom.edu",
                            name: "Adriana Doherty"},
                          { email: "mike@rusom.edu",
                            name: "Michael McAuliffe"},
                          { email: "jeff@rusom.edu",
                            name: "Jeff Lempicki"},
                          { email: "abhi@rusom.edu",
                            name: "Abhi Pradhan"}
                        ],

                books:  [{  title: "JavaScript: The Definitive Guide",
                            cover: "https://images.gr-assets.com/books/1347652925l/148050.jpg",
                            gr_id: "148050" },

                        {   title: "What Is Node",
                            cover: "https://images.gr-assets.com/books/1384803722l/18652730.jpg",
                            gr_id: "18652730" },

                        {   title: "Learning React: Functional Web Development with React and Redux",
                            cover: "https://images.gr-assets.com/books/1494421362l/29324861.jpg",
                            gr_id: "29324861"}
                        ],

                events: [{}]
            }


const seedOurDB = () => {

    users.map( (user, index) => {
        setTimeout( API.createUser( user ), 5000*index);
    })

    API.createClub( club );


}

export default seedOurDB;