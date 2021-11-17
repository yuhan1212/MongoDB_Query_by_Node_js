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

		console.log(
			"Query4: (25) Who are the top 10 people that got more retweets in average, after tweeting more than 3 times "
		);

		//From slack: different users are those with different user ids
		// const top_tweets_person = client;

		const top_10_retweet = await tweetCollection

			.aggregate([
				// { $match: { id_str: 1 } },
				{
					$group: {
						// id_str: "$user.id_str",
						_id: "$user.id_str",
						count_tweet: { $sum: 1 },
						count_been_retweet: { $sum: "$retweet_count" },
					},
				},
				{ $match: { count_tweet: { $gt: 3 } } },
				{
					$project: {
						average_retweets: {
							$divide: ["$count_been_retweet", "$count_tweet"],
						},
					},
				},
			])

			.sort({ average_retweets: -1 })
			.limit(10)
			.toArray();

		// after tweeting more than 3 times

		// const top_tweets_person_arr = await firesCollection
		// 	.find(top_tweets_person)
		// 	.toArray();
		console.log("top_10_retweet_arr:", top_10_retweet, "\n");

		// console.log("ieeevisTweets:", res);
		console.log("result:", top_10_retweet.length, "\n");
		// const collect = require("collect.js");
		// console.log(" ====== res cnt:", collect(res).count());
	} finally {
		await client.close();
	}
}

module.exports.getIeeevisTweets = getIeeevisTweets;
getIeeevisTweets();
