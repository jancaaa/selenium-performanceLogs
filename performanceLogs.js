const graphQlUrl = 'INSERT_GRAPHQL_URL_HERE';

class PerformanceLogs {

    constructor(driver) {
        this.driver = driver;
        this.logs = [];
    }


    /**
     * Get all new logs:
     * 1) from the last call of clearLogs() OR getLogs()
     * 2) since the beggining if getLogs() OR clearLogs() never called
     * Does not append to previous content, overides!
     */
    async getLogs() {
        var rawLogs = await this.driver.manage().logs().get('performance');
        var parsedLogs = [];
        for (var l of rawLogs) {
            var log = JSON.parse(l.message);
            parsedLogs.push(log);
        }
        return this.logs = parsedLogs;
    }

    /**
     * Alternative o 'clear' in the Dev Tools.
     */
    async clearLogs() {
        await this.driver.manage().logs().get('performance');
        return this.logs = [];
    }

    /**
     * List all methods present in logs array.
     */
    getLogMethods() {
        var methods = new Set();
        for (var log of this.logs) {
            methods.add(log.message.method);
        }
        return methods;
    }

    /**
     * Returns array of {requestId, operationName, query, variables} for each request found in logs. 
     */
    getGraphQLRequests() {
        var requests = [];
        for (var log of this.logs) {
            if (log.message.method == 'Network.requestWillBeSent' && log.message.params.request.url == graphQlUrl) {
                var requestId = log.message.params.requestId;
                var requestData = JSON.parse(log.message.params.request.postData);
                var item = {
                    requestId: requestId,
                    operationName: requestData.operationName,
                    query: requestData.query,
                    variables: requestData.variables
                }
                requests.push(item);
            }
        }
        return requests;
    }

    getGraphQLRequestsToString(){
        var requests = this.getGraphQLRequests();
        return JSON.stringify(requests, null, 2);
    }
}
module.exports = PerformanceLogs;