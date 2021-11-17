const { MongoClient } = require("mongodb");

async function getIeeevisTweets() {
	try {
		const myserver = "mongodb://localhost:27017";
		client = new MongoClient(myserver);
		await client.connect();

		console.log("Connect to Mongo Server\n");

		db = client.db("ieeevisTweets");
		const tweetCollection = db.collection("tweet");

		console.log(
			"Q5: Write the instructions that will separate the Users information into a different collection "
		);

		console.log(
			"==== Part1: Create a user collection that contains all the unique users. ===="
		);

		const all_users_db = await db.createCollection("all_users");
		const all_data = await tweetCollection.find().toArray();
		const all_user_arr = new Array();

		all_data.forEach((element) => {
			if (!all_user_arr.includes(element)) {
				all_user_arr.push(element);
				all_users_db.insertOne(element);
			}
		});

		console.log(
			" === Part2: Create a new Tweets_Only collection, that doesn't embed the user information, but instead references it using the user id "
		);

		const tweet_only_collection = await db.createCollection(
			"tweet_only_collection"
		);

		all_data.forEach((element) => {
			if (element.hasOwnProperty("user")) {
				const update_user_id = element["user"]["id_str"];
				delete element.user;
				// console.log("element delete:", element, "\n");
				element["user_id"] = update_user_id;
			}
			tweet_only_collection.insert(element);
		});
		// console.log("element:", element, "\n");

		// console.log("all_user_arr:", all_data[0].hasOwnProperty("user"), "\n");
		// console.log("user:", all_data[0]["user"], "\n");
		// const id = all_data[0]["user"]["id_str"];
		// delete all_data[0].user;
		// all_data[0]["user_id"] = id;
		// console.log("all_user_arr:", all_data[0].hasOwnProperty("user"), "\n");
		// console.log("all_user_arr:", all_data[0], "\n");
	} finally {
		await client.close();
	}
}

module.exports.getIeeevisTweets = getIeeevisTweets;
getIeeevisTweets();
