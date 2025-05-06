            <audio
                ref={audioRef}
                src={trackInfo.audio_file_path}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onLoadedMetadata={handleLoadedMetadata}
            /> 