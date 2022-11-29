import {
    userTogglesTuitDislikes,
    userTogglesTuitLikes,
    findAllTuitsLikedByUser,
    findAllTuitsDislikedByUser,
    userUnlikesTuit
} from "../services/likes-service";
import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";
import {
    createTuitByUser,
    deleteTuit,
    findTuitById
} from "../services/tuits-service";

describe('can like a tuit when not already liked or disliked', () => {
    // dummy user to create tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // dummy tuit
    const newTuit = {
        tuit: 'Ellen Ripley dummy tuit'
    };

    let dummyUser;
    let dummyTuit;

    // setup test before running test
    beforeEach(async () => {
        // create dummy user to create tuit
        dummyUser = await createUser(ripley);
        console.log("dummyUser",dummyUser)
        // create dummy tuit by dummy user
        dummyTuit = await createTuitByUser(dummyUser.id, newTuit);
        console.log("dummyT",dummyTuit)
    })

    // clean up after test runs
    afterEach(async () => {
        // remove tuits created by dummy user
        await deleteTuit(dummyTuit._id);

        // remove dummy user we created
        await deleteUsersByUsername(dummyUser.username)

        // remove likes created in tests
        await userUnlikesTuit(dummyUser.id, dummyTuit._id)
    })

    test('like tuit when not already liked or disliked', async () => {
        // like tuit
        await userTogglesTuitLikes(dummyUser.id, dummyTuit._id);

        // get likes made by dummy user
        const newLikes = await findAllTuitsLikedByUser(dummyUser.id);
        expect(newLikes.length).toEqual(1);

        // check like created is the expected tuit
        const newLike = newLikes[0];
        expect(newLike.tuit).toEqual(dummyTuit.tuit);
        expect(newLike.postedBy._id).toEqual(dummyUser.id);

        // check tuit stats updated
        const likedTuit = await findTuitById(dummyTuit._id);
        expect(likedTuit.stats.likes).toEqual(1);
        expect(likedTuit.stats.dislikes).toEqual(0);
    });
});

// describe('can like a tuit when already liked', () => {
//     // dummy user to create tuit
//     const ripley = {
//         username: 'ellenripley',
//         password: 'lv426',
//         email: 'ellenripley@aliens.com'
//     };

//     // dummy tuit
//     const newTuit = {
//         tuit: 'Ellen Ripley dummy tuit'
//     };

//     let dummyUser;
//     let dummyTuit;

//     // setup test before running test
//     beforeEach(async () => {
//         // create dummy user to create tuit
//         dummyUser = await createUser(ripley);

//         // create dummy tuit by dummy user
//         dummyTuit = await createTuitByUser(dummyUser.id, newTuit);

//         // like tuit
//         await userTogglesTuitLikes(dummyUser.id, dummyTuit._id);
//     })

//     // clean up after test runs
//     afterAll(async () => {
//         // remove tuits created by dummy user
//         await deleteTuit(dummyTuit._id);

//         // remove dummy user we created
//         await deleteUsersByUsername(dummyUser.username)

//         // remove likes created in tests
//         await userUnlikesTuit(dummyUser.id, dummyTuit._id)
//     })

//     test('like tuit when already liked', async () => {
//         // like tuit again (already liked)
//         await userTogglesTuitLikes(dummyUser.id, dummyTuit._id);

//         // get likes made by dummy user
//         const newLikes = await findAllTuitsLikedByUser(dummyUser.id);
//         expect(newLikes.length).toEqual(0);

//         // check tuit stats updated
//         const likedTuit = await findTuitById(dummyTuit._id);
//         expect(likedTuit.stats.likes).toEqual(0);
//         expect(likedTuit.stats.dislikes).toEqual(0);
//     });
// });

// describe('can dislike a tuit when not already disliked or liked', () => {
//     // dummy user to create tuit
//     const ripley = {
//         username: 'ellenripley',
//         password: 'lv426',
//         email: 'ellenripley@aliens.com'
//     };

//     // dummy tuit
//     const newTuit = {
//         tuit: 'Ellen Ripley dummy tuit'
//     };

//     let dummyUser;
//     let dummyTuit;

//     // setup test before running test
//     beforeEach(async () => {
//         // create dummy user to create tuit
//         dummyUser = await createUser(ripley);

//         // create dummy tuit by dummy user
//         dummyTuit = await createTuitByUser(dummyUser.id, newTuit);
//     })

//     // clean up after test runs
//     afterAll(async () => {
//         // remove tuits created by dummy user
//         await deleteTuit(dummyTuit._id);

//         // remove dummy user we created
//         await deleteUsersByUsername(dummyUser.username)

//         // remove likes created in tests
//         await userUnlikesTuit(dummyUser.id, dummyTuit._id)
//     })

//     test('dislike tuit when not already liked or disliked', async () => {
//         // dislike tuit
//         await userTogglesTuitDislikes(dummyUser.id, dummyTuit._id);

//         // get dislikes made by dummy user
//         const newDislikes = await findAllTuitsDislikedByUser(dummyUser.id);
//         expect(newDislikes.length).toEqual(1);

//         // check disliked tuit returned is correct tuit
//         const newDislike = newDislikes[0];
//         expect(newDislike.tuit).toEqual(dummyTuit.tuit);
//         expect(newDislike.postedBy._id).toEqual(dummyUser.id);

//         // check tuit stats updated
//         const dislikedTuit = await findTuitById(dummyTuit._id);
//         expect(dislikedTuit.stats.likes).toEqual(0);
//         expect(dislikedTuit.stats.dislikes).toEqual(1);
//     });
// });

// describe('can dislike a tuit when already disliked', () => {
//     // dummy user to create tuit
//     const ripley = {
//         username: 'ellenripley',
//         password: 'lv426',
//         email: 'ellenripley@aliens.com'
//     };

//     // dummy tuit
//     const newTuit = {
//         tuit: 'Ellen Ripley dummy tuit'
//     };

//     let dummyUser;
//     let dummyTuit;

//     // setup test before running test
//     beforeEach(async () => {
//         // create dummy user to create tuit
//         dummyUser = await createUser(ripley);

//         // create dummy tuit by dummy user
//         dummyTuit = await createTuitByUser(dummyUser.id, newTuit);

//         // dislike tuit
//         await userTogglesTuitDislikes(dummyUser.id, dummyTuit._id);
//     })

//     // clean up after test runs
//     afterAll(async () => {
//         // remove tuits created by dummy user
//         await deleteTuit(dummyTuit._id);

//         // remove dummy user we created
//         await deleteUsersByUsername(dummyUser.username)

//         // remove likes created in tests
//         await userUnlikesTuit(dummyUser.id, dummyTuit._id)
//     })

//     test('dislike tuit when already disliked', async () => {
//         // dislike tuit again (already disliked)
//         await userTogglesTuitDislikes(dummyUser.id, dummyTuit._id);

//         // get dislikes made by dummy user
//         const newDislikes = await findAllTuitsDislikedByUser(dummyUser.id);
//         expect(newDislikes.length).toEqual(0);

//         // check tuit stats updated
//         const dislikedTuit = await findTuitById(dummyTuit._id);
//         expect(dislikedTuit.stats.likes).toEqual(0);
//         expect(dislikedTuit.stats.dislikes).toEqual(0);
//     });
// });

// describe('can like a tuit when already disliked', () => {
//     // dummy user to create tuit
//     const ripley = {
//         username: 'ellenripley',
//         password: 'lv426',
//         email: 'ellenripley@aliens.com'
//     };

//     // dummy tuit
//     const newTuit = {
//         tuit: 'Ellen Ripley dummy tuit'
//     };

//     let dummyUser;
//     let dummyTuit;

//     // setup test before running test
//     beforeEach(async () => {
//         // create dummy user to create tuit
//         dummyUser = await createUser(ripley);

//         // create dummy tuit by dummy user
//         dummyTuit = await createTuitByUser(dummyUser.id, newTuit);

//         // dislike tuit
//         await userTogglesTuitDislikes(dummyUser.id, dummyTuit._id);
//     })

//     // clean up after test runs
//     afterAll(async () => {
//         // remove tuits created by dummy user
//         await deleteTuit(dummyTuit._id);

//         // remove dummy user we created
//         await deleteUsersByUsername(dummyUser.username)

//         // remove likes created in tests
//         await userUnlikesTuit(dummyUser.id, dummyTuit._id)
//     })

//     test('like tuit when already disliked', async () => {
//         // like tuit that has already been disliked
//         await userTogglesTuitLikes(dummyUser.id, dummyTuit._id);

//         // get dislikes made by dummy user
//         const newDislikes = await findAllTuitsDislikedByUser(dummyUser.id);
//         expect(newDislikes.length).toEqual(0);
//         // get likes made by dummy user
//         const newLikes = await findAllTuitsLikedByUser(dummyUser.id);
//         expect(newLikes.length).toEqual(1);

//         // check like has expected tuit
//         const newLike = newLikes[0];
//         expect(newLike.tuit).toEqual(dummyTuit.tuit);
//         expect(newLike.postedBy._id).toEqual(dummyUser.id);

//         // check tuit stats updated
//         const likedTuit = await findTuitById(dummyTuit._id);
//         expect(likedTuit.stats.likes).toEqual(1);
//         expect(likedTuit.stats.dislikes).toEqual(0);
//     });
// });

// describe('can dislike a tuit when already liked', () => {
//     // dummy user to create tuit
//     const ripley = {
//         username: 'ellenripley',
//         password: 'lv426',
//         email: 'ellenripley@aliens.com'
//     };

//     // dummy tuit
//     const newTuit = {
//         tuit: 'Ellen Ripley dummy tuit'
//     };

//     let dummyUser;
//     let dummyTuit;

//     // setup test before running test
//     beforeEach(async () => {
//         // create dummy user to create tuit
//         dummyUser = await createUser(ripley);

//         // create dummy tuit by dummy user
//         dummyTuit = await createTuitByUser(dummyUser.id, newTuit);

//         // like tuit
//         await userTogglesTuitLikes(dummyUser.id, dummyTuit._id);
//     })

//     // clean up after test runs
//     afterAll(async () => {
//         // remove tuits created by dummy user
//         await deleteTuit(dummyTuit._id);

//         // remove dummy user we created
//         await deleteUsersByUsername(dummyUser.username)

//         // remove likes created in tests
//         await userUnlikesTuit(dummyUser.id, dummyTuit._id)
//     })

//     test('dislike tuit when already liked', async () => {
//         // dislike tuit that has already been liked
//         await userTogglesTuitDislikes(dummyUser.id, dummyTuit._id);

//         // get dislikes made by dummy user
//         const newDislikes = await findAllTuitsDislikedByUser(dummyUser.id);
//         expect(newDislikes.length).toEqual(1);
//         // get likes made by dummy user
//         const newLikes = await findAllTuitsLikedByUser(dummyUser.id);
//         expect(newLikes.length).toEqual(0);

//         // check dislike is of expected tuit
//         const newDislike = newDislikes[0];
//         expect(newDislike.tuit).toEqual(dummyTuit.tuit);
//         expect(newDislike.postedBy._id).toEqual(dummyUser.id);

//         // check tuit stats updated
//         const likedTuit = await findTuitById(dummyTuit._id);
//         expect(likedTuit.stats.likes).toEqual(0);
//         expect(likedTuit.stats.dislikes).toEqual(1);
//     });
// });

// describe('can find my liked tuits', () => {
//     // dummy user to create tuit
//     const ripley = {
//         username: 'ellenripley',
//         password: 'lv426',
//         email: 'ellenripley@aliens.com'
//     };

//     // dummy tuits
//     const newTuit = [
//         {
//             tuit: 'Ellen Ripley dummy tuit'
//         },
//         {
//             tuit: 'dummy tuit'
//         },
//         {
//             tuit: 'another dummy tuit'
//         }
//     ];

//     let dummyUser;
//     let dummyTuit1;
//     let dummyTuit2;
//     let dummyTuit3;

//     // setup test before running test
//     beforeEach(async () => {
//         // create dummy user to create tuit
//         dummyUser = await createUser(ripley);

//         // create dummy tuits by dummy user
//         dummyTuit1 = await createTuitByUser(dummyUser.id, newTuit[0]);
//         dummyTuit2 = await createTuitByUser(dummyUser.id, newTuit[1]);
//         dummyTuit3 = await createTuitByUser(dummyUser.id, newTuit[2]);
//     })

//     // clean up after test runs
//     afterAll(async () => {
//         // remove tuits created by dummy user
//         await deleteTuit(dummyTuit1._id);
//         await deleteTuit(dummyTuit2._id);
//         await deleteTuit(dummyTuit3._id);

//         // remove dummy user we created
//         await deleteUsersByUsername(dummyUser.username);

//         // remove likes created in tests
//         await userUnlikesTuit(dummyUser.id, dummyTuit1._id);
//         await userUnlikesTuit(dummyUser.id, dummyTuit2._id);
//         await userUnlikesTuit(dummyUser.id, dummyTuit3._id);
//     })

//     test('can find my liked tuits', async () => {
//         // like tuit 1, 3
//         await userTogglesTuitLikes(dummyUser.id, dummyTuit1._id);
//         await userTogglesTuitLikes(dummyUser.id, dummyTuit3._id);

//         // get likes made by dummy user
//         const newLikes = await findAllTuitsLikedByUser(dummyUser.id);
//         expect(newLikes.length).toEqual(2);

//         // ensure likes returned for mylikes screen are the expected tuits
//         // check like created is of expected tuit
//         const newLike1 = newLikes[0];
//         expect(newLike1.tuit).toEqual(dummyTuit1.tuit);
//         expect(newLike1.postedBy._id).toEqual(dummyUser.id);
//         // check tuit stats updated
//         const likedTuit1 = await findTuitById(dummyTuit1._id);
//         expect(likedTuit1.stats.likes).toEqual(1);
//         expect(likedTuit1.stats.dislikes).toEqual(0);

//         // check like created is of expected tuit
//         const newLike2 = newLikes[1];
//         expect(newLike2.tuit).toEqual(dummyTuit3.tuit);
//         expect(newLike2.postedBy._id).toEqual(dummyUser.id);
//         // check tuit stats updated
//         const likedTuit2 = await findTuitById(dummyTuit3._id);
//         expect(likedTuit2.stats.likes).toEqual(1);
//         expect(likedTuit2.stats.dislikes).toEqual(0);
//     });
// });

// describe('can find my disliked tuits', () => {
//     // dummy user to create tuit
//     const ripley = {
//         username: 'ellenripley',
//         password: 'lv426',
//         email: 'ellenripley@aliens.com'
//     };

//     // dummy tuits
//     const newTuit = [
//         {
//             tuit: 'Ellen Ripley dummy tuit'
//         },
//         {
//             tuit: 'dummy tuit'
//         },
//         {
//             tuit: 'another dummy tuit'
//         }
//     ];

//     let dummyUser;
//     let dummyTuit1;
//     let dummyTuit2;
//     let dummyTuit3;

//     // setup test before running test
//     beforeEach(async () => {
//         // create dummy user to create tuit
//         dummyUser = await createUser(ripley);

//         // create dummy tuits by dummy user
//         dummyTuit1 = await createTuitByUser(dummyUser.id, newTuit[0]);
//         dummyTuit2 = await createTuitByUser(dummyUser.id, newTuit[1]);
//         dummyTuit3 = await createTuitByUser(dummyUser.id, newTuit[2]);
//     })

//     // clean up after test runs
//     afterAll(async () => {
//         // remove tuits created by dummy user
//         await deleteTuit(dummyTuit1._id);
//         await deleteTuit(dummyTuit2._id);
//         await deleteTuit(dummyTuit3._id);

//         // remove dummy user we created
//         await deleteUsersByUsername(dummyUser.username);

//         // remove likes created in tests
//         await userUnlikesTuit(dummyUser.id, dummyTuit1._id);
//         await userUnlikesTuit(dummyUser.id, dummyTuit2._id);
//         await userUnlikesTuit(dummyUser.id, dummyTuit3._id);
//     })

//     test('can find my disliked tuits', async () => {
//         // dislike tuit 1, 2
//         await userTogglesTuitDislikes(dummyUser.id, dummyTuit1._id);
//         await userTogglesTuitDislikes(dummyUser.id, dummyTuit2._id);

//         // get dislikes made by dummy user
//         const newDislikes = await findAllTuitsDislikedByUser(dummyUser.id);
//         expect(newDislikes.length).toEqual(2);

//         // ensure dislikes returned for my dislikes screen are the expected tuits
//         // check dislike created is of expected tuit
//         const newDislike1 = newDislikes[0];
//         expect(newDislike1.tuit).toEqual(dummyTuit1.tuit);
//         expect(newDislike1.postedBy._id).toEqual(dummyUser.id);
//         // check tuit stats updated
//         const dislikedTuit1 = await findTuitById(dummyTuit1._id);
//         expect(dislikedTuit1.stats.likes).toEqual(0);
//         expect(dislikedTuit1.stats.dislikes).toEqual(1);

//         // check dislike created is of expected tuit
//         const newDislike2 = newDislikes[1];
//         expect(newDislike2.tuit).toEqual(dummyTuit2.tuit);
//         expect(newDislike2.postedBy._id).toEqual(dummyUser.id);
//         // check tuit stats updated
//         const dislikedTuit2 = await findTuitById(dummyTuit2._id);
//         expect(dislikedTuit2.stats.likes).toEqual(0);
//         expect(dislikedTuit2.stats.dislikes).toEqual(1);
//     });
// });