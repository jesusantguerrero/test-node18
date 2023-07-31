import Redis from 'ioredis';
export const startRedis = async() => {
    const redis = new Redis();

    redis.on('error', (err) => {
        console.log(err.message);
    })

    redis.on('ready', (err) => {
        console.log('The thing is ready');
    })

    redis.subscribe('system', (err, count) => {
        if (err) {
            console.err(err.message);
        } else {
            console.log(`subscriber No.: ${count}`)
        }
    });
    redis.on('message', (channel, message) => {
        console.log(message, `in ${channel}`);
    });
}

export const publish = async() => {
    const redis = new Redis();

    redis.publish("system", "Hello from the system");
}