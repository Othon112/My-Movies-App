import Config from "@/config";
import Image from "next/image";
interface IMovieCard {
    title: string;
    posterPath: string;
    releaseYear: number;
}
const MovieCardCarrousel: React.FC<IMovieCard> = ({
    title,
    posterPath,
    releaseYear,
}) => {
    const poster = Config.IMAGE_SOURCE + posterPath;
    return (
        <div className="flex items-center justify-center mx-2">
            <div className="mx-auto bg-white/40 rounded-2xl shadow-lg">
                <div className="grid rounded-2xl max-w-[220px] shadow-sm flex-col group">
                    {/* Poster Image */}
                    <Image
                        src={poster}
                        width={170}
                        height={240}
                        style={{height: "auto", width: "auto"}}
                        className="rounded-t-2xl justify-center grid object-cover"
                        alt={title}
                    />
                    <div className="p-4 z-10">
                        {/* Movie Title */}
                        <p className="h-10 text-base font-semibold">{title}</p>
                        <p className="text-slate-400 pt-1 text-sm font-semibold">
                            ({releaseYear})
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MovieCardCarrousel;