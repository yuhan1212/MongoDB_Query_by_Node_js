// const { MongoClient } = require("mongodb");

// // Connection URI
// // const uri = "mongodb+srv://sample-hostname:27017/?maxPoolSize=20&w=majority";
// const myserver = "mongodb://localhost:27017";
// // Create a new MongoClient
// const client = new MongoClient(myserver);

// async function run() {
// 	try {
// 		// Connect the client to the server
// 		await client.connect();
// 		console.log("Connect to Mongo Server");

// 		// Establish and verify connection
// 		await client.db("admin").command({ ping: 1 });
// 		console.log("Connected successfully to server");
// 	} finally {
// 		// Ensures that the client will close when you finish/error
// 		await client.close();
// 	}
// }
// // run().catch(console.dir);

const { MongoClient } = require("mongodb");

async function getIeeevisTweets() {
	// let db, client;

	try {
		const myserver = "mongodb://localhost:27017";
		client = new MongoClient(myserver);
		await client.connect();

		console.log("Connect to Mongo Server\n");

		// db = client.db("ieeevisTweets");
		db = client.db("ieeevisTweets");
		const tweetCollection = db.collection("tweet");

		console.log("Q3: Who is the person that got the most tweets? ");

		//From slack: different users are those with different user ids
		// const top_tweets_person = client;

		const top_tweets_person = await tweetCollection
			// .db("ieeevisTweets")
			// .collection("tweet")
			.aggregate([
				// { $match: { id_str: 1 } },
				{
					$group: {
						// id_str: "$user.id_str",
						_id: "$user.id_str",
						count: { $sum: 1 },
					},
				},
				// { $sort: { "user.followers_count": -1 } },
			])
			.sort({ count: -1 })
			.limit(1)
			.toArray();

		// const top_tweets_person_arr = await firesCollection
		// 	.find(top_tweets_person)
		// 	.toArray();
		console.log("top_tweets_person_arr:", top_tweets_person, "\n");

		// console.log("ieeevisTweets:", res);
		console.log("result:", top_tweets_person.length, "\n");
		// const collect = require("collect.js");
		// console.log(" ====== res cnt:", collect(res).count());
	} finally {
		await client.close();
	}
}

module.exports.getIeeevisTweets = getIeeevisTweets;
getIeeevisTweets();
