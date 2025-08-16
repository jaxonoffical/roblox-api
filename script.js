const axios = require('axios');

async function getRobloxUserProfile(userId) {
    try {
        const userResponse = await axios.get(`https://users.roblox.com/v1/users/${userId}`);
        const userData = userResponse.data;
        const username = userData.name;
        const description = userData.description;
        const created = new Date(userData.created).toLocaleDateString();
        const thumbnailResponse = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`);
        const pfp = thumbnailResponse.data.data[0].imageUrl;
        return { username, description, created, pfp };
    } catch (err) {
        return null;
    }
}

const robloxId = 1;
getRobloxUserProfile(robloxId).then(profile => {
    if (profile) {
        console.log("Username:", profile.username);
        console.log("Description:", profile.description || "No description set");
        console.log("Joined:", profile.created);
        console.log("Profile Picture URL:", profile.pfp);
    } else {
        console.log("User not found or an error occurred.");
    }
});
