const parseArgs = () => {
    const result = process.argv.slice(2)
        .map((arg, index, args) => {
            if (index % 2 === 0 && index + 1 < args.length) {
                const propName = arg.substring(2);
                const value = args[index + 1];
                return `${propName} is ${value}`;
            }
            return null;
        })
        .filter(item => item !== null);

    console.log(result.join(', '));
};

parseArgs();