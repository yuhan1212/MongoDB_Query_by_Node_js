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
		const tweetCollection = db.collection("tweet");

		console.log(
			"Query2: Return the top 10 screen_names by their number of followers."
		);
		// const query = {_id:618cc735651366f76bda9db8};
		// const not_retweets_or_replies = {};
		// const not_retweets_or_replies_arr = await tweetCollection
		// 	.find(not_retweets_or_replies)
		// 	.toArray();

		// const top_screens_names_by_followers = {};
		const top_screens_names_by_followers = await tweetCollection
			.aggregate([
				// const top_screens_names_by_followers = tweetCollection
				// .db("ieeevisTweets")
				// .collection("tweet")
				// .aggregate([
				// {
				// 	$group: { _id: "$screen_name" },
				// },
				// { $match: {} },
				{
					$group: {
						_id: "$user.screen_name",
						numFollower: { $max: "$user.followers_count" },
					},
				},

				// { $sort: { "user.followers_count": -1 } },

				// { $project: { _id: 1 } },

				// { $match: { status: "urgent" } },
				// { $group: { _id: "$productName", sumQuantity: { $sum: "$quantity" } } }
			])
			.sort({ numFollower: -1 })
			.limit(10)
			.toArray();
		// const top_screens_names_by_followers = await tweetCollection
		// 	.find({})
		// 	// .find({
		// 	// 	user: { screen_name: 1, followers_count: 1 },
		// 	// 	// $query: { user: { screen_name: 1, followers_count: 1 } },
		// 	// 	// $orderby: { followers_count: -1 },
		// 	// })
		// 	// .sort({ followers_count: -1, _id: 1 })
		// 	.limit(100)
		// 	.toArray();

		// console.log("ieeevisTweets:", res);
		console.log(
			"top_screens_names_by_followers:",
			top_screens_names_by_followers,
			"\n"
		);
		console.log("result:", top_screens_names_by_followers.length, "\n");
		// const collect = require("collect.js");
		// console.log(" ====== res cnt:", collect(res).count());
	} finally {
		await client.close();
	}
}

module.exports.getIeeevisTweets = getIeeevisTweets;
getIeeevisTweets();
