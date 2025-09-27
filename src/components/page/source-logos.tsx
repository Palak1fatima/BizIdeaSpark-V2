export function SourceLogos() {
    const logos = [
        { 
            name: 'Bloomberg', 
            color: 'text-gray-400 hover:text-gray-200',
            border: 'border-gray-700 hover:border-gray-500'
        },
        { 
            name: 'TechCrunch', 
            color: 'text-teal-400/80 hover:text-teal-300',
            border: 'border-teal-800/50 hover:border-teal-600'
        },
        { 
            name: 'Hacker News', 
            color: 'text-orange-400/80 hover:text-orange-300',
            border: 'border-orange-800/50 hover:border-orange-600'
        },
        { 
            name: 'Indie Hackers', 
            color: 'text-green-400/80 hover:text-green-300',
            border: 'border-green-800/50 hover:border-green-600'
        },
        { 
            name: 'Forbes', 
            color: 'text-blue-400/80 hover:text-blue-300',
            border: 'border-blue-800/50 hover:border-blue-600'
        },
    ];

    return (
        <div className="mt-8">
            <p className="text-sm text-muted-foreground/60 mb-4 text-center">
                Sourcing trends and insights from industry leaders
            </p>
            <div className="flex justify-center items-center gap-x-4 md:gap-x-6 flex-wrap" aria-label="Data sources">
                {logos.map((logo) => (
                    <div 
                        key={logo.name} 
                        className={`text-sm font-medium ${logo.color} transition-all duration-300 px-4 py-2 border ${logo.border} rounded-lg bg-background/50 hover:bg-background/80 hover:scale-105 hover:shadow-sm`}
                        title={logo.name}
                    >
                        {logo.name}
                    </div>
                ))}
            </div>
        </div>
    );
}