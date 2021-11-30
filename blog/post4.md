<h2> November 30 </h2>

<p>
  It's almost December, and 21 days until I return from my study abroad program.
  Over the past week I have been working on various assignments for my courses, spending some times on CodeWars, and prepping myself for interviews.
  I also solved several LeetCode questions. I came up with what I think is a rather clever solution to LeetCode problem 121. At first I punched in a O(n^2) solution, where I
  iterate through the array using two for loops, the outer loop picking some starting point (each index of the array in order), then running the inner loop which takes each following
  index and compares its value to the first. Throughout this process the highest value of these is being stored in some variable, which is then returned after the loops.
  <br>
  This is, of course, rather inefficient. My next thought was to attempt a divide and conquer approach - that led me to recall another problem I had done only a few days ago.
  The maximum subarray problem, which finds the largest value of the sum of values in a subarray and returns it. I used divide and conquer on that also, and thought that was good
  enough. After researching it I found <a href="https://en.wikipedia.org/wiki/Maximum_subarray_problem"> Kadane's Algorithm </a>. This is a O(N), linear time, approach.
  <br>
  I modified the idea slightly so that instead of summing the numbers it simply compares the first and last indeces, and submitted it - linear time! Beats out 85% of other submissions.
</p>
