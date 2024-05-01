 print_in_orange() {
  echo  "\033[1;38;5;208m$1\033[0m"
}

print_in_yellow() {
  echo "\033[1;33m$1\033[0m"
}

function TEST() {
    print_in_yellow "TEST $1"
}

function CASE() {

  message="$*"
  print_in_orange "\n\nCASE $message"
}