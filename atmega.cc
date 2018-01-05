
#include <Wire.h>
#include <stdio.h>
#include <stdlib.h>

//place for necesary sensor values
int temp[2];
//place for necesary number of data bytes
char data[20];

//returns number of digits in number
int num_length(int num){
    //counter
    int i = 0;
    
    //while loop to iterate trought all digits
    while (num > 0)
    {
        //divides by 10 so what is after "," is lost
        num = num / 10;
        i++;
    }
    return i;
}

void convert_data_to_char(){
    // counter for cursor in data array
    int count = 0;
    
    //gets size of array
    int size_of_arr = sizeof(temp) / sizeof(int);
    
    //iterates trougth array
    for(int i = 0; i < size_of_arr; i++){
        
        //datermines number of digits in integer
        int num_lenght = num_length(temp[i]);
    
     //iterates trought separate digit
     for(int j = 0; j < num_lenght; j++){
         // gets last digit and convert to char by adding '0'
          char c = (temp[i]%10) + '0';
          //removes last digit, int dont store anithing after ','
          temp[i] = temp[i]/10;
          //char is stored in global data array
          data[count] = c;
          count++;
     }
         // ',' is inserted after each number
         data[count] = ',';
         count++;
  }
}

void setup() {
  Wire.begin(8);                // join i2c bus with address #8
  Wire.onRequest(requestEvent); // register event    
}

void loop() {
  //delay(100);
  
}

// function that executes whenever data is requested by master
// this function is registered as an event, see setup()
void requestEvent() {
  //test data will be replaced with analogRead(...)
  temp[0] = analogRead(0);
  temp[1] = analogRead(1);
  //converts all data to one char string with coma separation agter each int
  convert_data_to_char();
  //esp recieves only last string
  Wire.write(data); // respond with message of xxx bytes
}
