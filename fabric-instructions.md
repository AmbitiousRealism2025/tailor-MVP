One-Line Install (Recommended)  
Unix/Linux/macOS:

curl \-fsSL https://raw.githubusercontent.com/danielmiessler/fabric/main/scripts/installer/install.sh | bash  
Windows PowerShell:

iwr \-useb https://raw.githubusercontent.com/danielmiessler/fabric/main/scripts/installer/install.ps1 | iex  
See scripts/installer/README.md for custom installation options and troubleshooting.

Manual Binary Downloads  
The latest release binary archives and their expected SHA256 hashes can be found at https://github.com/danielmiessler/fabric/releases/latest

Using package managers  
NOTE: using Homebrew or the Arch Linux package managers makes fabric available as fabric-ai, so add the following alias to your shell startup files to account for this:

alias fabric='fabric-ai'  
macOS (Homebrew)  
brew install fabric-ai

Arch Linux (AUR)  
yay \-S fabric-ai

Windows  
Use the official Microsoft supported Winget tool:

winget install danielmiessler.Fabric

From Source  
To install Fabric, make sure Go is installed, and then run the following command.

\# Install Fabric directly from the repo  
go install github.com/danielmiessler/fabric/cmd/fabric@latest  
Docker  
Run Fabric using pre-built Docker images:

\# Use latest image from Docker Hub  
docker run \--rm \-it kayvan/fabric:latest \--version

\# Use specific version from GHCR  
docker run \--rm \-it ghcr.io/ksylvan/fabric:v1.4.305 \--version

\# Run setup (first time)  
mkdir \-p $HOME/.fabric-config  
docker run \--rm \-it \-v $HOME/.fabric-config:/root/.config/fabric kayvan/fabric:latest \--setup

\# Use Fabric with your patterns  
docker run \--rm \-it \-v $HOME/.fabric-config:/root/.config/fabric kayvan/fabric:latest \-p summarize

\# Run the REST API server  
docker run \--rm \-it \-p 8080:8080 \-v $HOME/.fabric-config:/root/.config/fabric kayvan/fabric:latest \--serve  
Images available at:

Docker Hub: kayvan/fabric  
GHCR: ksylvan/fabric  
See scripts/docker/README.md for building custom images and advanced configuration.

Environment Variables  
You may need to set some environment variables in your \~/.bashrc on linux or \~/.zshrc file on mac to be able to run the fabric command. Here is an example of what you can add:

For Intel based macs or linux

\# Golang environment variables  
export GOROOT=/usr/local/go  
export GOPATH=$HOME/go

\# Update PATH to include GOPATH and GOROOT binaries  
export PATH=$GOPATH/bin:$GOROOT/bin:$HOME/.local/bin:$PATH  
for Apple Silicon based macs

\# Golang environment variables  
export GOROOT=$(brew \--prefix go)/libexec  
export GOPATH=$HOME/go  
export PATH=$GOPATH/bin:$GOROOT/bin:$HOME/.local/bin:$PATH  
Setup  
Now run the following command

\# Run the setup to set up your directories and keys  
fabric \--setup  
If everything works you are good to go.

Per-Pattern Model Mapping  
You can configure specific models for individual patterns using environment variables like FABRIC\_MODEL\_PATTERN\_NAME=vendor|model

This makes it easy to maintain these per-pattern model mappings in your shell startup files.

Add aliases for all patterns  
In order to add aliases for all your patterns and use them directly as commands, for example, summarize instead of fabric \--pattern summarize You can add the following to your .zshrc or .bashrc file. You can also optionally set the FABRIC\_ALIAS\_PREFIX environment variable before, if you'd prefer all the fabric aliases to start with the same prefix.

\# Loop through all files in the \~/.config/fabric/patterns directory  
for pattern\_file in $HOME/.config/fabric/patterns/\*; do  
    \# Get the base name of the file (i.e., remove the directory path)  
    pattern\_name="$(basename "$pattern\_file")"  
    alias\_name="${FABRIC\_ALIAS\_PREFIX:-}${pattern\_name}"

    \# Create an alias in the form: alias pattern\_name="fabric \--pattern pattern\_name"  
    alias\_command="alias $alias\_name='fabric \--pattern $pattern\_name'"

    \# Evaluate the alias command to add it to the current shell  
    eval "$alias\_command"  
done

yt() {  
    if \[ "$\#" \-eq 0 \] || \[ "$\#" \-gt 2 \]; then  
        echo "Usage: yt \[-t | \--timestamps\] youtube-link"  
        echo "Use the '-t' flag to get the transcript with timestamps."  
        return 1  
    fi

    transcript\_flag="--transcript"  
    if \[ "$1" \= "-t" \] || \[ "$1" \= "--timestamps" \]; then  
        transcript\_flag="--transcript-with-timestamps"  
        shift  
    fi  
    local video\_link="$1"  
    fabric \-y "$video\_link" $transcript\_flag  
}  
You can add the below code for the equivalent aliases inside PowerShell by running notepad $PROFILE inside a PowerShell window:

\# Path to the patterns directory  
$patternsPath \= Join-Path $HOME ".config/fabric/patterns"  
foreach ($patternDir in Get-ChildItem \-Path $patternsPath \-Directory) {  
    \# Prepend FABRIC\_ALIAS\_PREFIX if set; otherwise use empty string  
    $prefix \= $env:FABRIC\_ALIAS\_PREFIX ?? ''  
    $patternName \= "$($patternDir.Name)"  
    $aliasName \= "$prefix$patternName"  
    \# Dynamically define a function for each pattern  
    $functionDefinition \= @"  
function $aliasName {  
    \[CmdletBinding()\]  
    param(  
        \[Parameter(ValueFromPipeline \= \`$true)\]  
        \[string\] \`$InputObject,

        \[Parameter(ValueFromRemainingArguments \= \`$true)\]  
        \[String\[\]\] \`$patternArgs  
    )

    begin {  
        \# Initialize an array to collect pipeline input  
        \`$collector \= @()  
    }

    process {  
        \# Collect pipeline input objects  
        if (\`$InputObject) {  
            \`$collector \+= \`$InputObject  
        }  
    }

    end {  
        \# Join all pipeline input into a single string, separated by newlines  
        \`$pipelineContent \= \`$collector \-join "\`n"

        \# If there's pipeline input, include it in the call to fabric  
        if (\`$pipelineContent) {  
            \`$pipelineContent | fabric \--pattern $patternName \`$patternArgs  
        } else {  
            \# No pipeline input; just call fabric with the additional args  
            fabric \--pattern $patternName \`$patternArgs  
        }  
    }  
}  
"@  
    \# Add the function to the current session  
    Invoke-Expression $functionDefinition  
}

\# Define the 'yt' function as well  
function yt {  
    \[CmdletBinding()\]  
    param(  
        \[Parameter()\]  
        \[Alias("timestamps")\]  
        \[switch\]$t,

        \[Parameter(Position \= 0, ValueFromPipeline \= $true)\]  
        \[string\]$videoLink  
    )

    begin {  
        $transcriptFlag \= "--transcript"  
        if ($t) {  
            $transcriptFlag \= "--transcript-with-timestamps"  
        }  
    }

    process {  
        if (-not $videoLink) {  
            Write-Error "Usage: yt \[-t | \--timestamps\] youtube-link"  
            return  
        }  
    }

    end {  
        if ($videoLink) {  
            \# Execute and allow output to flow through the pipeline  
            fabric \-y $videoLink $transcriptFlag  
        }  
    }  
}  
This also creates a yt alias that allows you to use yt https://www.youtube.com/watch?v=4b0iet22VIk to get transcripts, comments, and metadata.

Save your files in markdown using aliases  
If in addition to the above aliases you would like to have the option to save the output to your favorite markdown note vault like Obsidian then instead of the above add the following to your .zshrc or .bashrc file:

\# Define the base directory for Obsidian notes  
obsidian\_base="/path/to/obsidian"

\# Loop through all files in the \~/.config/fabric/patterns directory  
for pattern\_file in \~/.config/fabric/patterns/\*; do  
    \# Get the base name of the file (i.e., remove the directory path)  
    pattern\_name=$(basename "$pattern\_file")

    \# Remove any existing alias with the same name  
    unalias "$pattern\_name" 2\>/dev/null

    \# Define a function dynamically for each pattern  
    eval "  
    $pattern\_name() {  
        local title=\\$1  
        local date\_stamp=\\$(date \+'%Y-%m-%d')  
        local output\_path=\\"\\$obsidian\_base/\\${date\_stamp}-\\${title}.md\\"

        \# Check if a title was provided  
        if \[ \-n \\"\\$title\\" \]; then  
            \# If a title is provided, use the output path  
            fabric \--pattern \\"$pattern\_name\\" \-o \\"\\$output\_path\\"  
        else  
            \# If no title is provided, use \--stream  
            fabric \--pattern \\"$pattern\_name\\" \--stream  
        fi  
    }  
    "  
done  
This will allow you to use the patterns as aliases like in the above for example summarize instead of fabric \--pattern summarize \--stream, however if you pass in an extra argument like this summarize "my\_article\_title" your output will be saved in the destination that you set in obsidian\_base="/path/to/obsidian" in the following format YYYY-MM-DD-my\_article\_title.md where the date gets autogenerated for you. You can tweak the date format by tweaking the date\_stamp format.

