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
		// Establish and verify connection
		// await client.db("admin").command({ ping: 1 });

		console.log("Connect to Mongo Server\n");

		// db = client.db("ieeevisTweets");
		db = client.db("ieeevisTweets");
		const firesCollection = db.collection("tweet");

		console.log("Q1: How many tweets are not retweets or replies? ");
		// const query = {_id:618cc735651366f76bda9db8};
		const not_retweets_or_replies = {
			$and: [
				{ retweeted_status: { $exists: false } },
				{ in_reply_to_status_id: null },
				{ in_reply_to_status_id_str: null },
				{ in_reply_to_user_id: null },
				{ in_reply_to_screen_name: null },
				{ in_reply_to_user_id_str: null },
			],
		};
		const not_retweets_or_replies_arr = await firesCollection
			.find(not_retweets_or_replies)
			.toArray();

		// console.log("ieeevisTweets:", res);
		console.log("result:", not_retweets_or_replies_arr.length, "\n");
		// const collect = require("collect.js");
		// console.log(" ====== res cnt:", collect(res).count());
	} finally {
		await client.close();
	}
}

module.exports.getIeeevisTweets = getIeeevisTweets;
getIeeevisTweets();
