# Ruby program to create 
# a simple thread

# Thread method
def ThreadFun()
	puts "Thread executed";
end

# Create a thread
t = Thread.new{ThreadFun()};

# Join created thread.
t.join();

puts "Program finished";
