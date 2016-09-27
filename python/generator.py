#!/usr/bin/python3

import sys;
import os;
import time;
import random;
import threading;

char_arr = list(c for c in "abcdefghijklmnopqrstuvwxyz");
global_word_list = list();

class WordListGenerator(threading.Thread):
    def __init__(self,limit=5,word_length=6):
        threading.Thread.__init__(self);
        self.word_list = list();
        self.rng = random.Random();
        self.rng.seed(time.time());
        self.limit = limit;
        self.word_length = word_length;
        return;

    def run(self):
        global char_arr;
        global global_word_list;
        for i in range(0,self.limit): #generate "self.limit" words
            word = str();
            for j in range(0,self.word_length): #generate word with a length of 6 chars
                n = self.rng.randint(0,25);
                word += char_arr[n];
            print("Generated : "+word);
            if word not in global_word_list:
                global_word_list.append(word);
            else:
                print("Generated Duplicate : "+word);
                i-=1;
        return;


if __name__ == "__main__":
    total_words = int(input("Number of words to generate : "));
    word_length = int(input("Length of each word : "));
    num_threads = int();
    words_per_thread = int();
    for i in range(2,100):
        if total_words%i == 0:
            num_threads = int(total_words/i);
            words_per_thread = i;
            break;
    print("Creating "+str(num_threads)+" threads of "+str(words_per_thread)+" ...");
    for i in range(0,num_threads):
        wlg = WordListGenerator(words_per_thread,word_length);
        wlg.start();
        wlg.join();
    print(":: Generation : DONE ::");
    print(":: Outputting wordlist to wordlist.txt...")
    if "wordlist.txt" in os.listdir():
        print("::: NOTE : Previous wordlist.txt exists, please move/rename the file, or it will be replaced...")
        n = input("::: (Press Enter when done) :::");
        del(n);
        if "wordlist.txt" in os.listdir():
            print("::: Replacing wordlist.txt...")
            os.remove("wordlist.txt");

    wf = open("wordlist.txt","a+");
    for word in global_word_list:
        wf.write(word+"\n");
    wf.close();
    print(" :: Finished writing to wordlist.txt...");
