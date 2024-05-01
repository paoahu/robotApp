print_in_orange() {
  echo -e "\033[1;38;5;208m$1\033[0m"
}

print_in_yellow() {
  echo -e "\033[1;33m$1\033[0m"
}

function TEST() {
    print_in_yellow "TEST $1"
}

function CASE() {
  message="$*"
  print_in_orange "\n\nCASE $message"
}

edit_sequence() {
    sequenceId=$1
    movementId=$2
    action=$3
    curl -X PATCH "http://localhost:9000/arduino/controller/ottoController/$sequenceId" \
        -H "Content-Type: application/json" \
        -d "{\"movementId\":\"$movementId\", \"action\":\"$action\"}"
    echo -e "\nAction $action performed on sequence $sequenceId for movement $movementId."
}


echo "Control de edición de secuencias:"
echo "Presiona 'd' para borrar un movimiento, 'u' para mover un movimiento hacia arriba, 'n' para mover un movimiento hacia abajo."


SEQUENCE_ID="65ec9788bcfbaf8e5d352a6c"
MOVEMENT_ID="65ec9ced16cd00646b53aa1d"

# Bucle de control
while true; do
    read -p "Ingrese su acción (d/u/n/q para salir): " action
    case $action in
        [dD])
            edit_sequence "$SEQUENCE_ID" "$MOVEMENT_ID" "delete"
            ;;
        [uU])
            edit_sequence "$SEQUENCE_ID" "$MOVEMENT_ID" "moveUp"
            ;;
        [nN])
            edit_sequence "$SEQUENCE_ID" "$MOVEMENT_ID" "moveDown"
            ;;
        [qQ])
            echo "Saliendo..."
            break
            ;;
        *)
            echo "Entrada inválida. Intente nuevamente."
            ;;
    esac
done