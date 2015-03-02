# Write a Ruby program that takes a name as input and displays a greeting that differs depending
# on the time of day (morning, noon, evening), e.g. "Good morning, <name>".
#
# The program should repeatedly prompt for a name and output a greeting.  If a name that has been
# entered before is entered again, it should output "Welcome back, <name>."
#
# Please provide the command line to run the program (e.g. "ruby hello.rb").


require "set"
module SapCodeTest

  class Greeting
    attr_reader :names

    def initialize
      @names = Set.new
    end

    def greet(name)
      if @names.include?(name)
        return "Welcome back #{name}"
      else
        @names.add(name)
        t = Time.new()
        # Morning   = 24:00/00:00 -> 11:59
        # Afternoon = 12:00       -> 16:59
        # Evening   = 17:00       -> 23:59
        if (t.hour >= 0 && t.hour < 12) || t.hour == 24
          return "Good morning, #{name}"
        elsif t.hour >=12 && t.hour < 17
          return "Good Afternoon, #{name}"
        elsif t.hour >= 17 && t.hour < 24
          return "Good Evening, #{name}"
        else
          raise "Illegal time: hours out of 0 to 24 range"
        end
      end
    end
  end

  def main
    if ARGV.length <= 0
      puts "Please input name as command line argument"
    else
      greeting = Greeting.new
      puts greeting.greet(ARGV.join(" "))
      loop do
        print "Please input name: "
        STDOUT.flush
        puts greeting.greet($stdin.gets.chomp)
      end
    end

  end
end


include SapCodeTest
main
