// the underscore between two word in function name et var name is a norme of rust

fn main() {
    // i define the number of stick and if that the player turn
    let mut sticks = 20;
    let mut player_turn = true;

    // i make a while loop while stick is superior to 0
    while sticks > 0 {
        // i definine a mutable variable who serve to know the number of stick take
        let mut sticks_taken;
        // i choose the action between computer and user
        if player_turn {
            // i display to the user the number of stick left , ask the user the number of stick he want to get
            println!(
                "Il y a {} bâtonnets restants. Combien voulez-vous en prendre ?",
                sticks
            );

            sticks_taken = read_input();
            println!("Vous avez pris {} bâtonnets.", sticks_taken);
        } else {
            // i use the modulo to calcul the "perfect" move
            sticks_taken = sticks % 4;
            if sticks_taken == 0 {
                sticks_taken = 1;
            }
            println!("L'ordinateur a pris {} bâtonnets.", sticks_taken);
        }

        sticks -= sticks_taken;

        // i reverse the actual player if the game is not finish
        if sticks > 0 {
            player_turn = !player_turn;
        }
    }

    // Display information about the winner
    if player_turn {
        println!("Vous avez gagné !");
    } else {
        println!("L'ordinateur a gagné !");
    }
}
/**
 * this function take the user input and parse it to number (number can only between 1 and 3)
 */
fn read_input() -> u32 {
    // i create a string in the heap (because my string doesn't have a define size)
    let mut input = String::new();
    // i read the user input and use a reference to assign the return to input  (&mut mean i pass a reference and this reference is mutable so my variable change inside of the function)
    std::io::stdin()
        .read_line(&mut input)
        .expect("Erreur de lecture de l'entrée");
    // i parse to u32 (int) the input
    let mut number = input
        .trim()
        .parse()
        .expect("Erreur de conversion en entier");
    // i verify if number is not between 1 and 3 and if that true i recursively call the function
    if number > 3 || number == 0 {
        println!("Vous avez pris trop de batonnets ou pas assez de batonnets , vous devez choisir entre 1 et 3 batonnets");
        number = read_input()
    }
    return number;
}
