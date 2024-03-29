import { DefaultUi, Player, Youtube } from '@vime/react';
import '@vime/core/themes/default.css';
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
} from 'phosphor-react';
import { useGetMusicBySlugQuery } from '../graphql/generated';

interface VideoProps {
  musicSlug: string;
}

export function Video(props: VideoProps) {
  const { data } = useGetMusicBySlugQuery({
    variables: {
      slug: props.musicSlug,
    },
  });

  if (!data || !data.music) {
    return (
      <div className="flex-1">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.music.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{data.music.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.music.description}
            </p>

            {data.music.channel && (
              <div className="flex items-center gap-4 mt-6">
                <img
                  className="h-16 w-16 rounded-full border-2 border-brown-400"
                  src={data.music.channel.avatarUrl}
                  alt=""
                />

                <div className="leading-relaxed">
                  <strong className="font-bold text-2xl block">
                    {data.music.channel.name}
                  </strong>
                  <span className="text-gray-200 text-sm block">
                    {data.music.channel.description}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="p-4 text-sm bg-brown-500 flex items-end rounded font-bold uppercase gap-2 justify-center hover:bg-brown-600 transition-colors"
            >
              <DiscordLogo size={24} />
              Comunidade do discord
            </a>

            <a
              href="#"
              className="p-4 text-sm border border-brown-400 text-brown-400 flex items-end rounded font-bold uppercase gap-2 justify-center hover:bg-brown-400 hover:text-gray-900 transition-colors"
            >
              <Lightning size={24} />
              Acesse a música extra
            </a>
          </div>
        </div>

        <div className="gap-8 mt-20 grid grid-cols-2">
          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-brown-600 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Playlist completa</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse a playlist completa para quem estiver com pressa
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-brown-600 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers e personalize a sua máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
