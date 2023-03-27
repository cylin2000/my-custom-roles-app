const fetch = require('node-fetch').default;
const fs = require('fs')

// add role names to this object to map them to group ids in your AAD tenant
const roleGroupMappings = {
    'admin': '01370c29-49d6-41f0-8283-3d3d96cb9a15',
    'reader': '01370c29-49d6-41f0-8283-3d3d96cb9a15'
};

module.exports = async function (context, req) {
    const user = req.body || {};
    const roles = [];
    
    for (const [role, groupId] of Object.entries(roleGroupMappings)) {
        if (await isUserInGroup(groupId, user.accessToken)) {
            roles.push(role);
        }
    }

    //write token to file
    // const content = user.accessToken
    // fs.writeFile('/tmp/test_access_token.txt', content, err => {
    //     if (err) {
    //         // console.error(err)
    //         // return
    //     }
    // })

    context.res.json({
        roles
    });
}

async function isUserInGroup(groupId, bearerToken) {
    const url = new URL('https://graph.microsoft.com/v1.0/me/memberOf');
    url.searchParams.append('$filter', `id eq '${groupId}'`);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
    });

    if (response.status !== 200) {
        return false;
    }

    const graphResponse = await response.json();
    const matchingGroups = graphResponse.value.filter(group => group.id === groupId);
    return matchingGroups.length > 0;
}