
export function TextLoader() {
    return (
        <div className="flex flex-col space-y-2 p-4 bg-white/50 rounded-xl max-w-[200px]">
            <div className="h-2 bg-slate-200 rounded animate-pulse w-3/4"></div>
            <div className="h-2 bg-slate-200 rounded animate-pulse w-1/2"></div>
            <div className="h-2 bg-slate-200 rounded animate-pulse w-5/6"></div>
        </div>
    );
}
