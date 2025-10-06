# Fabric AI - Prompting Strategies Reference

**Total Strategies:** 9
**Last Updated:** 2025-10-05
**Source:** [Fabric GitHub Repository](https://github.com/danielmiessler/fabric)

---

## 📚 What Are Prompting Strategies?

Prompting strategies are advanced techniques that guide how AI models think through and solve problems. Each strategy represents a different cognitive approach that can be applied to various tasks. Fabric allows you to use these strategies to enhance pattern outputs.

---

## 🎯 Quick Reference Table

| Strategy | Complexity | Best For | When to Use |
|----------|-----------|----------|-------------|
| **standard** | Simple | Direct answers | Quick facts, simple queries |
| **cot** | Medium | Step-by-step reasoning | Math, logic, explanations |
| **cod** | Medium | Concise reasoning | When you need compact thinking |
| **ltm** | Medium | Progressive difficulty | Complex problems, learning |
| **tot** | High | Multiple approaches | Creative tasks, problem-solving |
| **aot** | High | Decomposition | Complex systems, modular problems |
| **reflexion** | High | Self-improvement | Critical analysis, refinement |
| **self-refine** | High | Iterative improvement | Quality enhancement |
| **self-consistent** | High | Verification | Important decisions, accuracy |

---

## 📖 Complete Strategy Guide

### 1. Standard Prompting

**Description:** Standard Prompting
**Complexity:** ⭐ Simple
**Speed:** ⚡⚡⚡ Fastest

**What It Does:**
Answer questions directly without any explanation or reasoning process.

**Prompt Template:**
```
Answer the question directly without any explanation or reasoning.
```

**Best For:**
- Quick factual answers
- Simple queries
- When you just need the answer
- Fast responses

**Example Use Cases:**
- "What is the capital of France?"
- "Define photosynthesis"
- "List the planets in order"

**When to Avoid:**
- Complex problem-solving
- When you need to understand the reasoning
- Mathematical proofs
- Critical analysis

---

### 2. Chain-of-Thought (CoT) Prompting

**Description:** Chain-of-Thought (CoT) Prompting
**Complexity:** ⭐⭐ Medium
**Speed:** ⚡⚡ Moderate

**What It Does:**
Break down reasoning into explicit step-by-step thinking before providing the final answer.

**Prompt Template:**
```
Think step by step to answer the question. Return the final answer in the required format.
```

**Best For:**
- Mathematical problems
- Logic puzzles
- Multi-step reasoning
- Educational explanations
- Debugging processes

**Example Use Cases:**
- Solving algebra equations
- Planning project timelines
- Analyzing cause and effect
- Code debugging logic
- Scientific reasoning

**Advantages:**
- Transparent reasoning process
- Easier to verify correctness
- Better for complex problems
- Educational value

**Example Output:**
```
Question: If a train travels 60 mph for 2.5 hours, how far does it go?

Step 1: Identify the formula (Distance = Speed × Time)
Step 2: Plug in values (Distance = 60 mph × 2.5 hours)
Step 3: Calculate (Distance = 150 miles)

Final Answer: 150 miles
```

---

### 3. Chain-of-Draft (CoD) Prompting

**Description:** Chain-of-Draft (CoD) Prompting
**Complexity:** ⭐⭐ Medium
**Speed:** ⚡⚡ Moderate

**What It Does:**
Think through steps with minimal drafts (5 words max per step) for concise reasoning.

**Prompt Template:**
```
Think step by step, keeping a minimal draft (5 words max) for each step. Return the final answer in the required format.
```

**Best For:**
- When you need reasoning but want brevity
- Space-constrained outputs
- Token efficiency
- Quick decision-making

**Example Use Cases:**
- Summarizing multi-step processes
- Quick problem-solving
- Efficient code reviews
- Rapid analysis

**Advantages:**
- Combines reasoning with brevity
- Token-efficient
- Still shows thinking process
- Faster than full CoT

**Example Output:**
```
Question: Calculate 15% tip on $80 bill

Draft 1: "15% = 0.15"
Draft 2: "80 × 0.15"
Draft 3: "= $12"

Final Answer: $12
```

---

### 4. Least-to-Most Prompting

**Description:** Least-to-Most Prompting
**Complexity:** ⭐⭐ Medium
**Speed:** ⚡⚡ Moderate

**What It Does:**
Break down complex problems into simpler sub-problems, solving from easiest to hardest progressively.

**Prompt Template:**
```
Break down the problem into simpler sub-problems from easiest to hardest; answer concisely at each step.
```

**Best For:**
- Learning new concepts
- Teaching material
- Progressive problem-solving
- Building understanding
- Complex multi-layered problems

**Example Use Cases:**
- Learning programming concepts
- Understanding complex theories
- Breaking down large projects
- Educational content
- Skill development

**Advantages:**
- Natural learning progression
- Builds confidence
- Prevents overwhelm
- Good for teaching
- Systematic approach

**Example Output:**
```
Problem: Build a web application with user authentication

Easiest: Create basic HTML structure
Easy: Add CSS styling
Medium: Implement form validation
Medium-Hard: Set up backend API
Hardest: Implement JWT authentication

[Each step solved in sequence]
```

---

### 5. Tree-of-Thought (ToT) Prompting

**Description:** Tree-of-Thought (ToT) Prompting
**Complexity:** ⭐⭐⭐ High
**Speed:** ⚡ Slower

**What It Does:**
Generate multiple reasoning paths (like a tree), evaluate them, and select the best approach.

**Prompt Template:**
```
Generate multiple reasoning paths briefly and select the best one.
```

**Best For:**
- Creative problem-solving
- Multiple valid approaches
- Strategic planning
- Design decisions
- Optimization problems

**Example Use Cases:**
- Architecture decisions
- Marketing strategies
- Product design
- Code optimization
- Business planning

**Advantages:**
- Explores alternatives
- Finds optimal solutions
- Creative thinking
- Comprehensive analysis
- Better decision-making

**Example Output:**
```
Problem: Improve website load time

Path 1: Optimize images → Reduce file sizes → Lazy loading
Path 2: CDN implementation → Cache headers → Minify assets
Path 3: Code splitting → Remove unused dependencies → Async loading

Evaluation:
- Path 1: Easy, 20% improvement
- Path 2: Medium effort, 40% improvement ← Best
- Path 3: Complex, 30% improvement

Selected: Path 2 (CDN + caching + minification)
```

---

### 6. Atom-of-Thought (AoT) Prompting

**Description:** Atom-of-Thought (AoT) Prompting
**Complexity:** ⭐⭐⭐ High
**Speed:** ⚡ Slower

**What It Does:**
Decompose problems into the smallest independent "atomic" units, solve each separately, then synthesize.

**Prompt Template:**
```
To solve this problem, break it down into the smallest independent 'atomic' sub-problems.
For each atomic sub-problem:
1. Label it as 'Atom X: [brief description]'
2. Solve that specific subproblem completely
3. Make sure each atom can be solved independently

After solving all atomic sub-problems, provide a synthesis that combines them into a final answer.
Return the final answer in the required format.
```

**Best For:**
- Complex system design
- Modular problems
- Parallel processing tasks
- Independent components
- Distributed systems

**Example Use Cases:**
- Microservices architecture
- Component-based design
- Parallel algorithm design
- Modular code structure
- System decomposition

**Advantages:**
- Maximum decomposition
- Parallel solvable
- Clear boundaries
- Modular thinking
- Scalable approach

**Example Output:**
```
Problem: Design a blog platform

Atom 1: User Authentication System
- Login/logout functionality
- Password hashing
- Session management

Atom 2: Post Creation Module
- WYSIWYG editor
- Draft saving
- Publishing workflow

Atom 3: Comment System
- Nested comments
- Moderation tools
- Spam filtering

Atom 4: Search Functionality
- Full-text search
- Tag filtering
- Search indexing

Synthesis: Integrate all atoms through REST API with shared database
```

---

### 7. Reflexion Prompting

**Description:** Reflexion Prompting
**Complexity:** ⭐⭐⭐ High
**Speed:** ⚡ Slower

**What It Does:**
Provide an answer, critically evaluate your own reasoning, then provide a refined version.

**Prompt Template:**
```
Answer concisely, critique your reasoning briefly, and provide a refined answer.
```

**Best For:**
- Critical analysis
- Self-improvement
- Quality assurance
- Error detection
- Iterative refinement

**Example Use Cases:**
- Code review (self)
- Writing improvement
- Decision validation
- Argument strengthening
- Quality control

**Advantages:**
- Self-correcting
- Identifies weaknesses
- Improves over time
- Critical thinking
- Higher quality output

**Example Output:**
```
Question: Why did the Roman Empire fall?

Initial Answer:
The Roman Empire fell due to barbarian invasions and internal corruption.

Critique:
This answer is oversimplified and ignores economic factors, military issues,
and the division of the empire. It lacks nuance and historical context.

Refined Answer:
The Roman Empire's fall resulted from multiple interconnected factors: economic
decline from inflation and taxation, military overextension and reliance on
mercenaries, political instability and corruption, division into Eastern and
Western empires, and sustained pressure from migrating Germanic tribes. The
process was gradual, occurring over centuries rather than a single event.
```

---

### 8. Self-Refine Prompting

**Description:** Self-Refinement
**Complexity:** ⭐⭐⭐ High
**Speed:** ⚡ Slower

**What It Does:**
Provide an initial answer, critique it, and then refine if necessary.

**Prompt Template:**
```
Provide an initial concise answer, critique it briefly, and refine if necessary.
```

**Best For:**
- Writing improvement
- Answer optimization
- Quality enhancement
- Iterative development
- Progressive refinement

**Example Use Cases:**
- Essay writing
- Code optimization
- Design iterations
- Product improvement
- Communication clarity

**Advantages:**
- Continuous improvement
- Quality focused
- Adaptive refinement
- Self-evaluation
- Progressive enhancement

**Difference from Reflexion:**
- More focused on improvement than critique
- May not refine if initial answer is good
- Less philosophical, more practical

**Example Output:**
```
Question: Write a product description for noise-canceling headphones

Initial Answer:
"These headphones block out noise and sound great."

Critique:
Too generic, lacks specific features, doesn't create desire, no differentiation.

Refined Answer:
"Experience studio-quality audio with active noise cancellation that eliminates
up to 95% of ambient sound. Premium 40mm drivers deliver rich bass and crystal-
clear highs, while 30-hour battery life keeps you immersed all day. Perfect for
travel, work, or deep focus."
```

---

### 9. Self-Consistency Prompting

**Description:** Self-Consistency Prompting
**Complexity:** ⭐⭐⭐ High
**Speed:** ⚡ Slowest

**What It Does:**
Generate multiple independent reasoning paths and select the most consistent answer across them.

**Prompt Template:**
```
Provide multiple reasoning paths and select the most consistent answer.
```

**Best For:**
- Important decisions
- Accuracy verification
- Multiple valid approaches
- Consensus building
- Error reduction

**Example Use Cases:**
- Critical calculations
- Medical diagnoses
- Legal analysis
- Financial decisions
- Safety-critical systems

**Advantages:**
- Highest accuracy
- Error detection
- Confidence through consensus
- Multiple perspectives
- Robust answers

**Disadvantages:**
- Slowest strategy
- Most resource-intensive
- Overkill for simple tasks

**Example Output:**
```
Question: What is 15% of 240?

Path 1 (Decimal conversion):
15% = 0.15
240 × 0.15 = 36

Path 2 (Fraction method):
15% = 15/100
240 × (15/100) = 240 × 15 / 100 = 3600/100 = 36

Path 3 (10% + 5% method):
10% of 240 = 24
5% of 240 = 12
24 + 12 = 36

Consistency Check: All paths agree
Most Consistent Answer: 36
```

---

## 🎯 How to Use Strategies in Fabric

### Method 1: Environment Variable
```bash
# Set default strategy in ~/.config/fabric/.env
DEFAULT_PROMPTING_STRATEGY=cot

# Use with any pattern
echo "problem" | fabric -p analyze_claims
```

### Method 2: Per-Pattern Override
```bash
# Use specific strategy for one pattern
echo "problem" | fabric -p summarize --strategy=tot
```

### Method 3: Pattern-Specific Configuration
```bash
# Set strategy for specific patterns only
FABRIC_STRATEGY_analyze_paper=aot
FABRIC_STRATEGY_review_code=reflexion
```

---

## 📊 Strategy Selection Guide

### By Problem Type

**Mathematical/Logical Problems**
- Primary: `cot` (Chain-of-Thought)
- Alternative: `self-consistent` (for critical calculations)

**Creative Tasks**
- Primary: `tot` (Tree-of-Thought)
- Alternative: `aot` (for modular creativity)

**Complex Systems**
- Primary: `aot` (Atom-of-Thought)
- Alternative: `ltm` (Least-to-Most)

**Quality Improvement**
- Primary: `self-refine`
- Alternative: `reflexion`

**Learning/Teaching**
- Primary: `ltm` (Least-to-Most)
- Alternative: `cot`

**Critical Decisions**
- Primary: `self-consistent`
- Alternative: `tot`

**Quick Answers**
- Primary: `standard`
- Alternative: `cod` (if some reasoning needed)

---

### By Complexity

**Simple Tasks** (⭐)
- `standard` - Direct answers only

**Medium Tasks** (⭐⭐)
- `cot` - Step-by-step reasoning
- `cod` - Brief reasoning
- `ltm` - Progressive solving

**Complex Tasks** (⭐⭐⭐)
- `tot` - Multiple approaches
- `aot` - Atomic decomposition
- `reflexion` - Self-critique
- `self-refine` - Iterative improvement
- `self-consistent` - Consensus verification

---

### By Resource Constraints

**Token-Efficient**
1. `standard` (minimal)
2. `cod` (concise)
3. `cot` (moderate)

**Time-Efficient**
1. `standard` (fastest)
2. `cod` (fast)
3. `cot` (moderate)

**Quality-Focused** (resource-intensive okay)
1. `self-consistent` (highest accuracy)
2. `reflexion` (critical analysis)
3. `tot` (comprehensive exploration)

---

## 💡 Strategy Combinations

### Sequential Strategy Use

**Progressive Refinement:**
```bash
# 1. Quick answer with CoT
echo "problem" | fabric -p analyze_claims --strategy=cot > draft.txt

# 2. Refine with self-refine
cat draft.txt | fabric -p improve_writing --strategy=self-refine > final.txt
```

**Explore then Verify:**
```bash
# 1. Generate options with ToT
echo "design problem" | fabric -p create_design_document --strategy=tot > options.txt

# 2. Validate with self-consistent
cat options.txt | fabric -p review_design --strategy=self-consistent
```

---

## 🔧 Best Practices

### 1. Start Simple
Begin with `standard` or `cot`, only increase complexity when needed.

### 2. Match Strategy to Task
Don't use `self-consistent` for simple questions or `standard` for complex analysis.

### 3. Consider Trade-offs
- Speed vs. Quality
- Token usage vs. Accuracy
- Simplicity vs. Thoroughness

### 4. Combine with Patterns
Different patterns benefit from different strategies:
- `analyze_*` patterns → `cot`, `reflexion`
- `create_*` patterns → `tot`, `aot`
- `extract_*` patterns → `standard`, `cod`
- `summarize_*` patterns → `cod`, `ltm`

### 5. Iterate When Needed
Use `self-refine` or `reflexion` for quality-critical outputs.

---

## 📈 Strategy Comparison

| Feature | standard | cot | cod | ltm | tot | aot | reflexion | self-refine | self-consistent |
|---------|----------|-----|-----|-----|-----|-----|-----------|-------------|-----------------|
| **Speed** | ⚡⚡⚡ | ⚡⚡ | ⚡⚡ | ⚡⚡ | ⚡ | ⚡ | ⚡ | ⚡ | ⚡ |
| **Token Use** | Low | Med | Med | Med | High | High | High | High | V.High |
| **Accuracy** | Med | High | Med | High | V.High | High | V.High | V.High | Max |
| **Transparency** | None | High | Med | High | High | V.High | V.High | High | V.High |
| **Creativity** | Low | Med | Med | Med | V.High | High | Med | Med | Low |
| **Learning** | Low | High | Med | V.High | Med | Med | High | High | Low |

---

## 🎓 Learning Path

### Beginner Level
1. Start with `standard` for simple queries
2. Try `cot` for math/logic problems
3. Experiment with `cod` for concise reasoning

### Intermediate Level
4. Use `ltm` for learning new concepts
5. Apply `tot` to creative problems
6. Try `aot` for system design

### Advanced Level
7. Use `reflexion` for critical analysis
8. Apply `self-refine` for quality work
9. Use `self-consistent` for critical decisions

---

## 🔗 References

- **Fabric GitHub:** https://github.com/danielmiessler/fabric
- **Strategies Location:** `~/.config/fabric/strategies/` (if installed)
- **Research Papers:**
  - Chain-of-Thought: [Wei et al., 2022](https://arxiv.org/abs/2201.11903)
  - Tree-of-Thought: [Yao et al., 2023](https://arxiv.org/abs/2305.10601)
  - Self-Consistency: [Wang et al., 2022](https://arxiv.org/abs/2203.11171)

---

## 🚀 Quick Examples

### Example 1: Math Problem
```bash
# Simple approach
echo "What is 15% of 240?" | fabric -p ai --strategy=standard
# Answer: 36

# With reasoning
echo "What is 15% of 240?" | fabric -p ai --strategy=cot
# Step 1: Convert 15% to decimal (0.15)
# Step 2: Multiply 240 × 0.15
# Step 3: Result = 36
```

### Example 2: System Design
```bash
# Atomic decomposition approach
echo "Design a microservices architecture for e-commerce" | \
  fabric -p create_design_document --strategy=aot
# Returns: Atomic components with clear boundaries
```

### Example 3: Critical Decision
```bash
# Multiple verification paths
echo "Should we migrate to Kubernetes?" | \
  fabric -p analyze_tech_impact --strategy=self-consistent
# Returns: Multiple analysis paths with consensus
```

---

**Created with Fabric AI** | **Last Updated:** 2025-10-05
